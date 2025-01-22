import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-user-profile-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.scss']
})
export class UserProfileDialogComponent {
  dialogRef = inject(MatDialogRef<UserProfileDialogComponent>);

  // Mock form control values
  userId = '12345';
  name = 'John Doe';
  email = 'john.doe@example.com';
  roles = ['Admin', 'User'];
  entitlements = ['Read Access', 'Write Access', 'Admin Control'];

  closeDialog() {
    this.dialogRef.close();
  }

  saveChanges() {
    console.log('Changes saved!');
    this.dialogRef.close();
  }
}
