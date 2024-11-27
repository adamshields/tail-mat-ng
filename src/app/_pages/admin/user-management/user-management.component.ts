import { Component, OnInit } from '@angular/core';
import { TableConfig } from '../../../../@breaker/models/table-config.model';
import { MockDataService } from '../../../../@breaker/services/mock-data.service';
import { DynamicTableComponent } from "../../../../@breaker/components/dynamic-table/dynamic-table.component";

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [DynamicTableComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {
  userTableConfig!: TableConfig;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    const users = this.mockDataService.getUsers();

    this.userTableConfig = {
      columns: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'company', label: 'Company', sortable: true },
        { key: 'title', label: 'Title', sortable: true },
        { key: 'primaryEmail', label: 'Primary Email', sortable: true },
        { key: 'primaryPhone', label: 'Primary Phone', sortable: true },
      ],
      data: users.map((user) => ({
        ...user,
        name: `${user.firstName} ${user.lastName}`,
        primaryEmail: user.emails[0]?.email || 'N/A',
        primaryPhone: user.phoneNumbers[0]?.phoneNumber || 'N/A',
      })),
      pageSize: 10,
      toolbar: {
        actions: [
          {
            icon: 'add',
            label: 'Add User',
            callback: () => this.addUser(),
          },
          {
            icon: 'delete',
            label: 'Delete Selected',
            callback: () => this.deleteUser(),
          },
        ],
        searchEnabled: true,
        clearFiltersEnabled: true,
      },
      actions: [
        {
          icon: 'visibility',
          tooltip: 'View Details',
          callback: (row: any) => this.viewDetails(row),
        },
        {
          icon: 'email',
          tooltip: 'Resend Invite',
          callback: (row: any) => this.resendInvite(row),
        },
      ],
    };
  }

  addUser(): void {
    console.log('Add User');
    // Logic for adding a user
  }

  editUser(): void {
    console.log('Edit User');
    // Logic for editing a user
  }

  deleteUser(): void {
    console.log('Delete User');
    // Logic for deleting a user
  }

  viewDetails(row: any): void {
    console.log('View Details:', row);
    // Logic to view detailed information about a user
  }

  resendInvite(row: any): void {
    console.log('Resend Invite:', row);
    // Logic to resend an invite to the user
  }
}
