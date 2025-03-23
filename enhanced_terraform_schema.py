import json
import hcl2
import re
import sys
from pathlib import Path

"""
Terraform Schema & UI Generator

This script automatically generates JSON Schema and JSONForms UI definitions from Terraform configurations.
It analyzes variable definitions, validation rules, and actual values to create schema files that can be
used for documentation and UI form generation.

Key features:
- Discovers variables across all Terraform modules using modules.json
- Extracts variable types, descriptions, and validation rules from variables.tf files
- Processes values from all .tfvars files in a specified directory
- Tracks which .tfvars file each variable comes from
- Generates comprehensive JSON Schema with validation constraints
- Creates JSONForms UI Schema with appropriate form controls
- Organizes form fields by source file

Outputs:
- terraform_schema.json - Complete JSON Schema with types, constraints, and values
- terraform_ui_schema.json - JSONForms UI Schema defining form controls and layout
- terraform_layout.json - Optional alternative layout schema

Usage:
    python enhanced_terraform_schema.py [tfvars_directory]

Where:
    tfvars_directory - Directory containing .tfvars files (default: current directory)

The script requires the terraform_jsonforms_integration.py file to be in the same directory
for generating the UI schemas.
"""
# Import JSONForms generation functions
try:
    from terraform_jsonforms_integration import add_jsonforms_output
    jsonforms_available = True
except ImportError:
    jsonforms_available = False
    print("[WARNING] terraform_jsonforms_integration module not found. UI Schema generation disabled.")

def parse_tfvars_file(path: Path):
    """Parse a single terraform.tfvars file to get variable values"""
    print(f"[INFO] Loading tfvars: {path}")
    try:
        with open(path, 'r') as f:
            data = hcl2.load(f)
        print(f"[INFO] Loaded tfvars keys from {path}: {list(data.keys())}")
        return data
    except Exception as e:
        print(f"[ERROR] Failed to parse {path}: {e}")
        return {}

def parse_tfvars_directory(directory: Path):
    """Parse all .tfvars files in a directory and combine them"""
    combined_vars = {}
    source_map = {}  # Track which file each variable came from
    
    # Look for all .tfvars files in the directory
    tfvars_files = list(directory.glob("*.tfvars")) + list(directory.glob("*.auto.tfvars"))
    
    if not tfvars_files:
        print(f"[WARNING] No .tfvars files found in {directory}")
        return {}, {}
    
    print(f"[INFO] Found {len(tfvars_files)} tfvars files in {directory}")
    
    # Parse each file and merge the values
    for tfvars_file in tfvars_files:
        file_vars = parse_tfvars_file(tfvars_file)
        
        # For each variable in this file, record its source
        for var_name in file_vars.keys():
            source_map[var_name] = tfvars_file.name
            
        # Update combined vars, newer files override older ones
        combined_vars.update(file_vars)
    
    return combined_vars, source_map
def parse_variables_tf(path: Path):
    """Parse standard variables.tf for type information"""
    with open(path, 'r') as f:
        tf = hcl2.load(f)
    
    result = {}
    for block in tf:
        if isinstance(block, dict) and 'variable' in block:
            variable_block = block['variable']
            if isinstance(variable_block, dict):
                for name, details in variable_block.items():
                    result[name] = details
            elif isinstance(variable_block, list):
                for item in variable_block:
                    if isinstance(item, dict):
                        for name, details in item.items():
                            result[name] = details
    return result

def extract_validation_constraints(path: Path):
    """Extract various validation constraints directly from the file content"""
    constraints = {}
    
    with open(path, 'r') as f:
        content = f.read()
    
    # Extract variable names and their validation blocks
    var_blocks = re.findall(r'variable\s+"([^"]+)"\s+{([^}]+)}', content, re.DOTALL)
    if not var_blocks:
        var_blocks = re.findall(r'variable\s+([a-zA-Z0-9_]+)\s+{([^}]+)}', content, re.DOTALL)
    
    for var_name, var_block in var_blocks:
        var_constraints = {}
        
        # 1. Look for enum values using contains()
        if "contains(" in var_block and "validation" in var_block:
            matches = re.findall(r'contains\s*\(\s*\[([^\]]+)\]', var_block)
            if matches:
                for match in matches:
                    values = []
                    for val in match.split(','):
                        cleaned = val.strip().strip('"').strip("'")
                        if cleaned:
                            values.append(cleaned)
                    
                    if values:
                        var_constraints["enum"] = values
                        break  # Just use the first valid enum set found
        
        # 2. Look for number min/max constraints
        if "validation" in var_block:
            # Check for number range pattern: var.name >= X && var.name <= Y
            min_match = re.search(r'var\.[a-zA-Z0-9_]+\s*>=\s*(\d+)', var_block)
            max_match = re.search(r'var\.[a-zA-Z0-9_]+\s*<=\s*(\d+)', var_block)
            
            if min_match:
                var_constraints["minimum"] = int(min_match.group(1))
            
            if max_match:
                var_constraints["maximum"] = int(max_match.group(1))
        
        # 3. Look for string length constraints
        if "validation" in var_block and "length(" in var_block:
            # Check for min length pattern: length(var.name) >= X
            min_len_match = re.search(r'length\s*\(\s*var\.[a-zA-Z0-9_]+\s*\)\s*>=\s*(\d+)', var_block)
            # Check for max length pattern: length(var.name) <= Y
            max_len_match = re.search(r'length\s*\(\s*var\.[a-zA-Z0-9_]+\s*\)\s*<=\s*(\d+)', var_block)
            
            if min_len_match:
                var_constraints["minLength"] = int(min_len_match.group(1))
            
            if max_len_match:
                var_constraints["maxLength"] = int(max_len_match.group(1))
        
        # 4. Look for regex pattern constraints
        if "validation" in var_block and "regex(" in var_block:
            # Extract pattern from regex function
            pattern_match = re.search(r'regex\s*\(\s*"([^"]+)"', var_block)
            if pattern_match:
                var_constraints["pattern"] = pattern_match.group(1)
        
        # 5. Look for startswith/endswith constraints and convert to pattern
        if "validation" in var_block:
            starts_with = re.search(r'startswith\s*\(\s*var\.[a-zA-Z0-9_]+\s*,\s*"([^"]+)"\s*\)', var_block)
            if starts_with:
                var_constraints["pattern"] = f"^{re.escape(starts_with.group(1))}"
            
            ends_with = re.search(r'endswith\s*\(\s*var\.[a-zA-Z0-9_]+\s*,\s*"([^"]+)"\s*\)', var_block)
            if ends_with:
                var_constraints["pattern"] = f"{re.escape(ends_with.group(1))}$"
        
        # 6. Look for list length constraints
        if "validation" in var_block and "length(" in var_block:
            # Check for min items pattern: length(var.name) >= X for lists
            min_items_match = re.search(r'length\s*\(\s*var\.([a-zA-Z0-9_]+)\s*\)\s*>=\s*(\d+)', var_block)
            max_items_match = re.search(r'length\s*\(\s*var\.([a-zA-Z0-9_]+)\s*\)\s*<=\s*(\d+)', var_block)
            
            # We'll determine if this is for a list or string later when combining with type info
            if min_items_match:
                var_name_in_match = min_items_match.group(1)
                if var_name_in_match == var_name:
                    var_constraints["_minItems_or_minLength"] = int(min_items_match.group(2))
            
            if max_items_match:
                var_name_in_match = max_items_match.group(1)
                if var_name_in_match == var_name:
                    var_constraints["_maxItems_or_maxLength"] = int(max_items_match.group(2))
        
        if var_constraints:
            constraints[var_name] = var_constraints
    
    return constraints

def normalize_type(raw_type):
    if isinstance(raw_type, list) and len(raw_type) == 1:
        return normalize_type(raw_type[0])
    return raw_type

def tf_type_to_json_schema(tf_type):
    tf_type = normalize_type(tf_type)
    
    if isinstance(tf_type, str):
        tf_type = tf_type.strip()
        if tf_type == "string":
            return {"type": "string"}
        elif tf_type == "number":
            return {"type": "number"}
        elif tf_type == "bool":
            return {"type": "boolean"}
        elif tf_type.startswith("list("):
            inner_type = tf_type[5:-1].strip()
            return {"type": "array", "items": tf_type_to_json_schema(inner_type)}
        elif tf_type.startswith("map("):
            inner_type = tf_type[4:-1].strip()
            return {"type": "object", "additionalProperties": tf_type_to_json_schema(inner_type)}
        elif tf_type.startswith("object("):
            return {"type": "object"}
        elif tf_type.startswith("tuple("):
            return {"type": "array"}
        else:
            return {"type": "string"}
    elif isinstance(tf_type, dict):
        if "object" in tf_type:
            return {
                "type": "object",
                "properties": {
                    k: tf_type_to_json_schema(v) for k, v in tf_type["object"].items()
                },
                "required": list(tf_type["object"].keys())
            }
        elif "tuple" in tf_type:
            return {
                "type": "array",
                "items": [tf_type_to_json_schema(v) for v in tf_type["tuple"]]
            }
    
    return {"type": "string"}

def infer_type_from_value(value):
    if isinstance(value, str):
        return {"type": "string"}
    elif isinstance(value, bool):
        return {"type": "boolean"}
    elif isinstance(value, (int, float)):
        return {"type": "number"}
    elif isinstance(value, list):
        if all(isinstance(item, str) for item in value):
            return {"type": "array", "items": {"type": "string"}}
        elif all(isinstance(item, (int, float)) and not isinstance(item, bool) for item in value):
            return {"type": "array", "items": {"type": "number"}}
        elif all(isinstance(item, bool) for item in value):
            return {"type": "array", "items": {"type": "boolean"}}
        elif len(value) > 0:
            items = []
            for item in value:
                if isinstance(item, str):
                    items.append({"type": "string"})
                elif isinstance(item, bool):
                    items.append({"type": "boolean"})
                elif isinstance(item, (int, float)):
                    items.append({"type": "number"})
                else:
                    items.append({"type": "string"})
            
            if len(set(type(item) for item in value)) > 1:
                return {"type": "array", "prefixItems": items}
            else:
                return {"type": "array", "items": items[0]}
        else:
            return {"type": "array"}
    elif isinstance(value, dict):
        properties = {}
        for k, v in value.items():
            properties[k] = infer_type_from_value(v)
        
        return {
            "type": "object",
            "properties": properties,
            "required": list(value.keys())
        }
    else:
        return {"type": "string"}

def generate_json_schema(tfvars, source_map, module_var_metas, constraints_map):
    schema = {
        "type": "object",
        "properties": {},
        "required": []
    }

    for var_name, var_value in tfvars.items():
        found = False
        for module_vars in module_var_metas:
            if var_name in module_vars:
                meta = module_vars[var_name]
                raw_type = meta.get("type", "string")
                json_type = tf_type_to_json_schema(raw_type)
                
                # Add description if available
                if "description" in meta:
                    json_type["title"] = meta["description"]
                
                # Add source file information if available
                if var_name in source_map:
                    json_type["source"] = source_map[var_name]
                
                # Add constraints if we found them
                if var_name in constraints_map:
                    constraints = constraints_map[var_name]
                    
                    # Apply constraints based on the variable type
                    for constraint_name, constraint_value in constraints.items():
                        # Special handling for length constraints that depend on the type
                        if constraint_name == "_minItems_or_minLength":
                            if json_type.get("type") == "string":
                                json_type["minLength"] = constraint_value
                            elif json_type.get("type") == "array":
                                json_type["minItems"] = constraint_value
                        elif constraint_name == "_maxItems_or_maxLength":
                            if json_type.get("type") == "string":
                                json_type["maxLength"] = constraint_value
                            elif json_type.get("type") == "array":
                                json_type["maxItems"] = constraint_value
                        else:
                            # Direct constraint mapping
                            json_type[constraint_name] = constraint_value
                    
                    print(f"Added constraints for {var_name}: {constraints}")
                
                # Handle special cases for specific variable types
                if var_name == "a_tuple" and isinstance(var_value, list):
                    items = []
                    for item in var_value:
                        if isinstance(item, str):
                            items.append({"type": "string"})
                        elif isinstance(item, bool):
                            items.append({"type": "boolean"})
                        elif isinstance(item, (int, float)):
                            items.append({"type": "number"})
                        else:
                            items.append({"type": "string"})
                    json_type["prefixItems"] = items
                
                elif var_name == "a_map_of_strings" and isinstance(var_value, dict):
                    json_type["additionalProperties"] = {"type": "string"}
                
                elif var_name == "an_object" and isinstance(var_value, dict):
                    properties = {}
                    for k, v in var_value.items():
                        if k == "name":
                            properties[k] = {"type": "string"}
                        elif k == "age":
                            properties[k] = {"type": "number"}
                        elif k == "tags" and isinstance(v, list):
                            properties[k] = {
                                "type": "array",
                                "items": {"type": "string"}
                            }
                        else:
                            properties[k] = infer_type_from_value(v)
                    json_type["properties"] = properties
                    json_type["required"] = list(var_value.keys())
                
                json_type["default"] = var_value
                schema["properties"][var_name] = json_type
                
                if "default" not in meta:
                    schema["required"].append(var_name)
                
                found = True
                break
        
        if not found:
            # If no metadata found, infer type from value
            schema["properties"][var_name] = infer_type_from_value(var_value)
            schema["properties"][var_name]["default"] = var_value
            
            # Add source file information if available
            if var_name in source_map:
                schema["properties"][var_name]["source"] = source_map[var_name]
            
            # Still check for constraints
            if var_name in constraints_map:
                for constraint_name, constraint_value in constraints_map[var_name].items():
                    if constraint_name not in ["_minItems_or_minLength", "_maxItems_or_maxLength"]:
                        schema["properties"][var_name][constraint_name] = constraint_value

    return schema

# Main execution
def main():
    # Check if directory is provided as command line argument
    if len(sys.argv) > 1:
        tfvars_dir = Path(sys.argv[1])
    else:
        # Default to current directory if no argument provided
        tfvars_dir = Path(".")
    
    modules_json_path = Path(".terraform/modules/modules.json")
    
    # Ensure the directory exists
    if not tfvars_dir.exists() or not tfvars_dir.is_dir():
        print(f"[ERROR] Directory {tfvars_dir} does not exist or is not a directory")
        return
    
    print(f"[INFO] Processing tfvars files from directory: {tfvars_dir}")
    
    # Parse all tfvars files in the specified directory
    tfvars, source_map = parse_tfvars_directory(tfvars_dir)
    
    if not tfvars:
        print("[ERROR] No valid tfvars data found. Exiting.")
        return
    
    # Check if modules.json exists
    if not modules_json_path.exists():
        print(f"[WARNING] {modules_json_path} not found. Will try to continue with root variables.tf only.")
        modules_data = {"Modules": []}
    else:
        # Load modules data
        with open(modules_json_path, 'r') as f:
            modules_data = json.load(f)
    
    # Collect metadata from all module variables.tf files
    module_var_metas = []
    constraints_map = {}
    
    for module in modules_data.get("Modules", []):
        module_dir = Path(module.get("Dir", ""))
        variables_tf_path = module_dir / "variables.tf"
        
        print(f"Checking module: {module.get('Key')} at {variables_tf_path}")
        
        if variables_tf_path.exists():
            try:
                # Parse variable metadata
                module_vars = parse_variables_tf(variables_tf_path)
                module_var_metas.append(module_vars)
                
                # Extract validation constraints
                constraints = extract_validation_constraints(variables_tf_path)
                constraints_map.update(constraints)
                
                print(f"Found {len(module_vars)} variables and {len(constraints)} with constraints in {variables_tf_path}")
            except Exception as e:
                print(f"Error parsing {variables_tf_path}: {e}")
    
    # Check for root variables.tf
    root_variables_tf_path = Path("variables.tf")
    if root_variables_tf_path.exists():
        try:
            root_vars = parse_variables_tf(root_variables_tf_path)
            module_var_metas.append(root_vars)
            
            # Extract validation constraints
            constraints = extract_validation_constraints(root_variables_tf_path)
            constraints_map.update(constraints)
            
            print(f"Found {len(root_vars)} variables and {len(constraints)} with constraints in root variables.tf")
        except Exception as e:
            print(f"Error parsing root variables.tf: {e}")
    

    
    # Generate the final schema with all collected information
    final_schema = generate_json_schema(tfvars, source_map, module_var_metas, constraints_map)
    
    # Write schema to file
    output_path = tfvars_dir / "terraform_schema.json"
    with open(output_path, "w") as f:
        json.dump(final_schema, f, indent=2)
    
    print(f"*** Combined schema written to {output_path}")
    print(f"Found constraints for {len(constraints_map)} variables: {list(constraints_map.keys())}")

    # Generate JSONForms UI Schema if the module is available
    if jsonforms_available:
        print("\nGenerating JSONForms UI Schema...")
        ui_schema_path, layout_schema_path = add_jsonforms_output(final_schema, tfvars_dir)
        print("\nDONE Generating JSONForms UI Schema...")

if __name__ == "__main__":
    main()
