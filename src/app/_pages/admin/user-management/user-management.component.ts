import { Component } from '@angular/core';
import { BreakerColumnDirective } from '../../../../@breaker/components/breaker-column.directive';
import { BreakerGridComponent } from '../../../../@breaker/components/breaker-grid/breaker-grid.component';


@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [BreakerGridComponent, BreakerColumnDirective],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent {

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

  // Define action commands for the table
  commands = [
    {
      icon: 'visibility',
      tooltip: 'View Details',
      callback: (row: any) => this.viewDetails(row),
    },
    {
      icon: 'edit',
      tooltip: 'Edit User',
      callback: (row: any) => this.editUser(row),
    },
    {
      icon: 'delete',
      tooltip: 'Delete User',
      callback: (row: any) => this.deleteUser(row),
    },
  ];
  viewDetails(row: any): void {
    console.log('View Details:', row);
  }

  editUser(row: any): void {
    console.log('Edit User:', row);
  }

  deleteUser(row: any): void {
    console.log('Delete User:', row);
  }

}

