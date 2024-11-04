import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SampleDialogComponent } from '../sample-dialog/sample-dialog.component';


@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <button mat-flat-button (click)="openDialog()">Open Dialog</button>
  `,
  styles: `

  :host {
    padding: 24px;
  }

  `,
})
export class DialogComponent {
  dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(SampleDialogComponent);
  }
}
