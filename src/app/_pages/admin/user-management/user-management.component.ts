import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { DialogConfig } from '@angular/cdk/dialog';
import { BreakerColumnDirective } from '../../../../@breaker/components/breaker-column.directive';
import { BreakerDialogComponent, BreakerDialogConfig, DialogMode } from '../../../../@breaker/components/breaker-dialog/breaker-dialog.component';
import { BreakerGridComponent } from '../../../../@breaker/components/breaker-grid/breaker-grid.component';
import { BreakerToolbarComponent, ToolbarConfig } from '../../../../@breaker/components/breaker-toolbar/breaker-toolbar.component';

// Import your interfaces
interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [BreakerGridComponent, BreakerColumnDirective, BreakerToolbarComponent],
  templateUrl: './user-management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementComponent {
  // Toolbar configuration
  toolbarConfig: ToolbarConfig = {
    actions: [
      { id: 'add', icon: 'add', text: 'Add New', color: 'primary' },
      { id: 'edit', icon: 'edit', text: 'Edit', color: 'accent' },
      { id: 'delete', icon: 'delete', text: 'Delete', color: 'warn' },
      { id: 'custom', icon: 'upload', text: 'Import' }
    ],
    showSearch: true
  };

  // Grid commands
  commands = [
    {
      icon: 'visibility',
      tooltip: 'View Details',
      callback: (row: User) => this.viewDetails(row),
    },
    {
      icon: 'edit',
      tooltip: 'Edit User',
      callback: (row: User) => this.editUser(row),
    },
    {
      icon: 'delete',
      tooltip: 'Delete User',
      callback: (row: User) => this.deleteUser(row),
    },
  ];


  users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
    { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com' },
    { id: 6, name: 'Diana Evans', email: 'diana.evans@example.com' },
    { id: 7, name: 'Ethan Harris', email: 'ethan.harris@example.com' },
    { id: 8, name: 'Fiona Green', email: 'fiona.green@example.com' },
    { id: 9, name: 'George Hill', email: 'george.hill@example.com' },
    { id: 10, name: 'Hannah King', email: 'hannah.king@example.com' },
    { id: 11, name: 'Ian Lewis', email: 'ian.lewis@example.com' },
    { id: 12, name: 'Jack Martin', email: 'jack.martin@example.com' },
    { id: 13, name: 'Karen Nelson', email: 'karen.nelson@example.com' },
    { id: 14, name: 'Laura O Brien', email: 'laura.obrien@example.com' },
    { id: 15, name: 'Michael Perez', email: 'michael.perez@example.com' },
    { id: 16, name: 'Nina Quinn', email: 'nina.quinn@example.com' },
    { id: 17, name: 'Oscar Roberts', email: 'oscar.roberts@example.com' },
    { id: 18, name: 'Paula Scott', email: 'paula.scott@example.com' },
    { id: 19, name: 'Quincy Taylor', email: 'quincy.taylor@example.com' },
    { id: 20, name: 'Rachel Underwood', email: 'rachel.underwood@example.com' },
    { id: 21, name: 'Sam Vance', email: 'sam.vance@example.com' },
    { id: 22, name: 'Tina White', email: 'tina.white@example.com' },
    { id: 23, name: 'Uma Xavier', email: 'uma.xavier@example.com' },
    { id: 24, name: 'Victor Young', email: 'victor.young@example.com' },
    { id: 25, name: 'Wendy Zane', email: 'wendy.zane@example.com' },
    { id: 26, name: 'Xander Adams', email: 'xander.adams@example.com' },
    { id: 27, name: 'Yara Baker', email: 'yara.baker@example.com' },
    { id: 28, name: 'Zach Carter', email: 'zach.carter@example.com' },
    { id: 29, name: 'Amy Davis', email: 'amy.davis@example.com' },
    { id: 30, name: 'Brian Edwards', email: 'brian.edwards@example.com' }
  ];
  materialDataSource: any;

  // constructor() {}

  handleToolbarAction(event: {actionId: string; data?: any}) {
    switch(event.actionId) {
      case 'add':
        this.openDialog('create');
        break;
      case 'edit':
        this.openDialog('edit');
        break;
      case 'delete':
        this.openDialog('delete');
        break;
    }
  }

  private getDialogConfig(mode: DialogMode, user?: User): BreakerDialogConfig<User> {
    return {
      mode,
      title: this.getDialogTitle(mode),
      data: user,
      fields: [
        {
          key: 'name',
          label: 'Name',
          type: 'text',
          required: true,
          validators: [Validators.required]
        },
        {
          key: 'email',
          label: 'Email',
          type: 'email',
          required: true,
          validators: []
        },
        {
          key: 'firstName',
          label: 'First Name',
          type: 'text',
          required: true,
          validators: []
        }
      ]
    };
  }

  private getDialogTitle(mode: DialogMode): string {
    switch(mode) {
      case 'create': return 'Add New User';
      case 'edit': return 'Edit User';
      case 'view': return 'User Details';
      case 'delete': return 'Confirm Delete';
      default: return '';
    }
  }

  openDialog(mode: DialogMode, user?: User) {
    const dialogData = this.getDialogConfig(mode, user);

    const dialogRef = this.dialog.open(BreakerDialogComponent, {
      width: '500px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch(result.mode) {
          case 'create':
            this.createUser(result.data);
            break;
          case 'edit':
            this.updateUser(result.data);
            break;
          case 'delete':
            this.deleteUser(result.data);
            break;
        }
      }
    });
  }
  // CRUD Operations
  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  createUser(userData: Partial<User>) {
    const newId = Math.max(...this.users.map(u => u.id)) + 1;
    const newUser: User = {
      id: newId,
      name: userData.name || '',
      email: userData.email || ''
    };

    // Create new reference to trigger change detection
    this.users = [...this.users, newUser];

    // Force change detection
    this.cdr.markForCheck();
    console.log('User created successfully:', newUser);
  }



  updateUser(userData: User) {
    // Implement update logic
    console.log('Updating user:', userData);
  }

  viewDetails(row: User): void {
    this.openDialog('view', row);
  }

  editUser(row: User): void {
    this.openDialog('edit', row);
  }

  deleteUser(row: User): void {
    // Implement delete confirmation
    console.log('Delete User:', row);
  }
}
