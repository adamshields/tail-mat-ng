import os
import sys
import tempfile
import asyncio
import mysql.connector
from datetime import datetime
import logging
import argparse
import json
from mysql.connector import Error

"""
Database Backup Script
======================

This script performs backups and restores of a MySQL database, including individual table backups.
It also includes functionality to copy data between databases on different servers and environments.

Example Commands:
-----------------
1. Backup version 1.0.0 from dev environment:
   python db_backup.py --version 1.0.0 --source-env dev

2. Restore the entire database from a backup file:
   python db_backup.py --version 1.0.0 --source-env dev --restore-file ./backups/1.0.0/dev/FULL_breaker19er_backup.sql

3. Restore a specific table from a backup file:
   python db_backup.py --version 1.0.0 --source-env dev --restore-file ./backups/1.0.0/dev/tables/breaker19er_table_name_backup.sql --restore-table-name table_name

4. Copy data from dev environment to test environment:
   python db_backup.py --copy-data --source-env dev --target-env test

5. Copy a specific table from dev environment to test environment:
   python db_backup.py --copy-data --source-env dev --target-env test --table-name table_name
"""

# Load configuration from config file
with open('config.json') as config_file:
    config = json.load(config_file)

# Backup directory configuration
BACKUP_DIR = './backups'

def setup_logging(log_dir):
    """ Set up logging configuration """
    os.makedirs(log_dir, exist_ok=True)
    log_file = os.path.join(log_dir, 'db_backup.log')
    logging.basicConfig(
        filename=log_file,
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )
    
    # Also log to console
    console = logging.StreamHandler()
    console.setLevel(logging.INFO)
    formatter = logging.Formatter('%(levelname)s - %(message)s')
    console.setFormatter(formatter)
    logging.getLogger('').addHandler(console)

async def run_command(command):
    """ Run a shell command asynchronously and log output """
    # Create a safe command for logging by masking the password
    safe_command = command
    if "-p" in command:
        parts = command.split("-p")
        if len(parts) > 1:
            # Find where the password ends (at the next space)
            password_end = parts[1].find(" ")
            if password_end != -1:
                safe_command = parts[0] + "-p******" + parts[1][password_end:]
            else:
                safe_command = parts[0] + "-p******"
    
    logging.info(f"Running command: {safe_command}")
    process = await asyncio.create_subprocess_shell(command, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
    output, error = await process.communicate()

    if process.returncode != 0:
        logging.error(f"Command failed: {safe_command}\nError: {error.decode()}\nOutput: {output.decode()}")
        raise Exception(f"Command failed: {safe_command}\nError: {error.decode()}")

    logging.info(f"Command successful: {safe_command}")
    return output.decode()

async def backup_database(backup_dir, db_config):
    """ Backup the entire database while avoiding problematic statements """
    backup_file = os.path.join(backup_dir, f"FULL_{db_config['database']}_backup.sql")
    command = (
        f"mysqldump -h {db_config['host']} -P {db_config['port']} -u {db_config['user']} "
        f"-p{db_config['password']} --skip-comments --skip-set-charset --set-gtid-purged=OFF "
        f"--column-statistics=0 --no-tablespaces {db_config['database']} > {backup_file}"
    )
    await run_command(command)
    logging.info(f"Database backup completed: {backup_file}")
    return backup_file

async def backup_table(table_name, backup_file, db_config):
    """ Backup a single table """
    command = (
        f"mysqldump -h {db_config['host']} -P {db_config['port']} -u {db_config['user']} "
        f"-p{db_config['password']} --skip-comments --skip-set-charset --set-gtid-purged=OFF "
        f"--column-statistics=0 --no-tablespaces {db_config['database']} {table_name} > {backup_file}"
    )
    await run_command(command)
    logging.info(f"Table backup completed: {backup_file}")
    return backup_file

async def backup_tables(backup_dir, db_config):
    """ Backup each table individually """
    try:
        connection = mysql.connector.connect(
            host=db_config['host'],
            port=db_config['port'],
            user=db_config['user'],
            password=db_config['password'],
            database=db_config['database']
        )
        cursor = connection.cursor()
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()
        
        # Define the table backup directory
        table_backup_dir = os.path.join(backup_dir, 'tables')
        os.makedirs(table_backup_dir, exist_ok=True)
        
        tasks = []
        for (table_name,) in tables:  # Ensure table_name is extracted properly
            backup_file = os.path.join(table_backup_dir, f"{db_config['database']}_{table_name}_backup.sql")
            tasks.append(backup_table(table_name, backup_file, db_config))  # Pass table_name as a string

        # Run all backup operations asynchronously
        results = await asyncio.gather(*tasks)

        cursor.close()
        connection.close()
        return results
    except Error as e:
        logging.error(f"Error while connecting to MySQL: {e}")
        raise

async def restore_database(backup_file, db_config):
    """ Restore the entire database while ensuring the backup file exists """
    
    if not os.path.exists(backup_file):
        raise FileNotFoundError(f"Backup file does not exist: {backup_file}")

    command = (
        f"mysql -h {db_config['host']} -P {db_config['port']} -u {db_config['user']} "
        f"-p{db_config['password']} --init-command='SET sql_log_bin=0;' --force "
        f"{db_config['database']} < {backup_file}"
    )

    await run_command(command)
    logging.info(f"Database restored from backup: {backup_file}")

async def restore_table(backup_file, db_config, table_name):
    """ Restore a specific table from a backup file """
    if not os.path.exists(backup_file):
        raise FileNotFoundError(f"Backup file does not exist: {backup_file}")

    # First, drop and recreate the table structure
    try:
        connection = mysql.connector.connect(
            host=db_config['host'],
            port=db_config['port'],
            user=db_config['user'],
            password=db_config['password'],
            database=db_config['database']
        )
        cursor = connection.cursor()
        
        # Get the current table structure
        cursor.execute(f"SHOW CREATE TABLE {table_name}")
        create_table_stmt = cursor.fetchone()[1]
        
        # Drop the existing table
        cursor.execute(f"DROP TABLE IF EXISTS {table_name}")
        
        # Create the table again
        cursor.execute(create_table_stmt)
        
        cursor.close()
        connection.close()
    except Error as e:
        logging.error(f"Error preparing table for restore: {e}")
        raise

    # Now restore data from the backup
    command = (
        f"mysql -h {db_config['host']} -P {db_config['port']} -u {db_config['user']} "
        f"-p{db_config['password']} --init-command='SET sql_log_bin=0;' --force "
        f"{db_config['database']} < {backup_file}"
    )

    await run_command(command)
    logging.info(f"Table {table_name} restored from backup: {backup_file}")

async def copy_data_between_databases(source_env, target_env, table_name=None):
    """ Copy data from the source database to the target database safely """
    try:
        print(f"Starting copy operation from {source_env} to {target_env}...")
        
        # Validate environments exist in config
        if source_env not in config:
            raise ValueError(f"Source environment '{source_env}' not found in configuration")
        if target_env not in config:
            raise ValueError(f"Target environment '{target_env}' not found in configuration")
            
        source_db_config = config[source_env]
        target_db_config = config[target_env]
        
        print(f"Source database: {source_db_config['database']} on {source_db_config['host']}:{source_db_config['port']}")
        print(f"Target database: {target_db_config['database']} on {target_db_config['host']}:{target_db_config['port']}")

        # Create a dedicated temporary directory for this process
        temp_dir = tempfile.mkdtemp()
        print(f"Created temporary directory: {temp_dir}")

        try:
            if table_name:
                # For a single table
                print(f"Copying single table: {table_name}")
                temp_backup_file = os.path.join(temp_dir, f"{source_db_config['database']}_{table_name}_backup.sql")
                print(f"Will save to temporary file: {temp_backup_file}")
                
                # First check if table exists
                try:
                    connection = mysql.connector.connect(
                        host=source_db_config['host'],
                        port=source_db_config['port'],
                        user=source_db_config['user'],
                        password=source_db_config['password'],
                        database=source_db_config['database']
                    )
                    cursor = connection.cursor()
                    cursor.execute(f"SHOW TABLES LIKE '{table_name}'")
                    if not cursor.fetchone():
                        raise ValueError(f"Table '{table_name}' not found in source database")
                    cursor.close()
                    connection.close()
                except Error as e:
                    raise Exception(f"Error checking source table: {e}")
                
                # Backup the table
                print("Backing up table...")
                await backup_table(table_name, temp_backup_file, source_db_config)
                
                # Check if backup file was created
                if not os.path.exists(temp_backup_file):
                    raise FileNotFoundError(f"Backup file was not created: {temp_backup_file}")
                
                print(f"Table backup successful, file size: {os.path.getsize(temp_backup_file)} bytes")
                
                # Restore to target
                print("Restoring table to target database...")
                await restore_table(temp_backup_file, target_db_config, table_name)
                print("Table restore successful")
                
                # Cleanup table backup
                if os.path.exists(temp_backup_file):
                    os.remove(temp_backup_file)
                    print(f"Removed temporary file: {temp_backup_file}")
            else:
                # For the entire database
                print("Copying entire database")
                
                # Backup the source database
                print("Backing up source database...")
                backup_file = await backup_database(temp_dir, source_db_config)
                
                # Check if backup file was created
                if not os.path.exists(backup_file):
                    raise FileNotFoundError(f"Backup file was not created: {backup_file}")
                    
                print(f"Database backup successful, file size: {os.path.getsize(backup_file)} bytes")
                
                # Restore to target
                print("Restoring database to target...")
                await restore_database(backup_file, target_db_config)
                print("Database restore successful")
                
                # Cleanup database backup
                if os.path.exists(backup_file):
                    os.remove(backup_file)
                    print(f"Removed temporary file: {backup_file}")
        finally:
            # Make sure to clean up the temp directory
            try:
                os.rmdir(temp_dir)
                print(f"Removed temporary directory: {temp_dir}")
            except:
                print(f"Could not remove temporary directory: {temp_dir}")
        
        print(f"Data successfully copied from {source_env} to {target_env}")

    except Exception as e:
        print(f"Error during copy operation: {str(e)}")
        logging.error(f"An error occurred while copying data: {e}")
        raise

async def main(version, restore_file, restore_table_name, copy_data, source_env, target_env, table_name):
    """ Main function to handle command line arguments and perform operations """
    # Create backup directory structure
    log_dir = os.path.dirname(os.path.abspath(__file__))
    setup_logging(log_dir)
    
    try:
        # First verify source environment is valid
        if source_env not in config:
            raise ValueError(f"Environment '{source_env}' not found in configuration")
        
        # Check target environment if applicable
        if target_env and target_env not in config:
            raise ValueError(f"Environment '{target_env}' not found in configuration")
        
        db_config = config[source_env]
        
        # Handle copy operation first (doesn't require version)
        if copy_data and target_env:
            # Copy operation
            logging.info(f"Starting copy operation from {source_env} to {target_env}")
            await copy_data_between_databases(source_env, target_env, table_name)
        
        # Handle restore operation (may or may not require version)
        elif restore_file:
            # Restore operation
            logging.info(f"Starting restore operation from {restore_file}")
            if restore_table_name:
                await restore_table(restore_file, db_config, restore_table_name)
            else:
                await restore_database(restore_file, db_config)
        
        # Handle backup operation (requires version)
        elif version:
            # Create backup directory for this version and environment
            backup_dir = os.path.join(BACKUP_DIR, version, source_env)
            os.makedirs(backup_dir, exist_ok=True)
            
            # Backup operation
            logging.info(f"Starting backup operation for version {version}, environment {source_env}")
            if table_name:
                table_backup_dir = os.path.join(backup_dir, 'tables')
                os.makedirs(table_backup_dir, exist_ok=True)
                backup_file = os.path.join(table_backup_dir, f"{db_config['database']}_{table_name}_backup.sql")
                await backup_table(table_name, backup_file, db_config)
            else:
                await backup_database(backup_dir, db_config)
                await backup_tables(backup_dir, db_config)
        else:
            raise ValueError("No valid operation specified. Use --copy-data, --restore-file, or provide --version for backup.")
                    
        logging.info("Operation completed successfully")
                
    except Exception as e:
        logging.error(f"Operation failed: {str(e)}")
        raise

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Database Backup, Restore, and Copy Script')
    parser.add_argument('--version', type=str, help='Version of the release (e.g., 1.0.0)')
    parser.add_argument('--source-env', type=str, help='Source environment (e.g., dev, test, prod)')
    parser.add_argument('--restore-file', type=str, help='Path to the backup file to restore')
    parser.add_argument('--restore-table-name', type=str, help='Name of the table to restore from the backup file')
    parser.add_argument('--copy-data', action='store_true', help='Copy data from source to target database')
    parser.add_argument('--target-env', type=str, help='Target environment (e.g., dev, test, prod)')
    parser.add_argument('--table-name', type=str, help='Name of the table to copy (optional)')
    
    args = parser.parse_args()
    
    # Debug: Print out the parsed arguments
    print("Parsed arguments:")
    for arg in vars(args):
        print(f"  {arg}: {getattr(args, arg)}")
    
    # Check required arguments based on operation
    if args.copy_data and (not args.source_env or not args.target_env):
        parser.error("--copy-data requires both --source-env and --target-env")
    elif args.restore_file and not args.source_env:
        parser.error("--restore-file requires --source-env")
    elif not args.copy_data and not args.restore_file and (not args.version or not args.source_env):
        parser.error("Backup operation requires both --version and --source-env")
    
    try:
        asyncio.run(main(args.version, args.restore_file, args.restore_table_name, 
                        args.copy_data, args.source_env, args.target_env, args.table_name))
        print("Operation completed successfully!")
    except Exception as e:
        print(f"ERROR: {str(e)}")
        sys.exit(1)
