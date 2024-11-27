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
        { key: 'company', label: 'Company', sortable: true },
        { key: 'title', label: 'Title', sortable: true },
        { key: 'primaryEmail', label: 'Primary Email', sortable: true },
        { key: 'primaryPhone', label: 'Primary Phone', sortable: true },
      ],
      data: users.map((user) => ({
        ...user,
        primaryEmail: user.emails[0]?.email || 'N/A', // Show first email as primary
        primaryPhone: user.phoneNumbers[0]?.phoneNumber || 'N/A', // Show first phone as primary
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
            icon: 'edit',
            label: 'Edit User',
            callback: () => this.editUser(),
            isDisabled: true, // Logic for enabling/disabling goes here
          },
          {
            icon: 'delete',
            label: 'Delete User',
            callback: () => this.deleteUser(),
            isDisabled: true,
          },
        ],
        searchEnabled: true,
        clearFiltersEnabled: true,
      },
      formConfig: [
        { key: 'company', label: 'Company', type: 'text', required: true },
        { key: 'title', label: 'Title', type: 'text' },
        {
          key: 'emails',
          label: 'Emails',
          type: 'text', // Handle this dynamically in the form
        },
        {
          key: 'phoneNumbers',
          label: 'Phone Numbers',
          type: 'text', // Handle this dynamically in the form
        },
        {
          key: 'addresses',
          label: 'Addresses',
          type: 'text', // Handle this dynamically in the form
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
}
