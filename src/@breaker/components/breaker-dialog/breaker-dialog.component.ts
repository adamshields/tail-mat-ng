import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
// breaker-dialog.types.ts

// Available dialog modes
export type DialogMode = 'create' | 'edit' | 'view' | 'delete';

// Field types supported in dialog forms
export type DialogFieldType = 'text' | 'number' | 'email' | 'select' | 'date';

// Interface for field options (used in select fields)
export interface DialogFieldOption {
  value: any;
  label: string;
}

// Single field configuration
export interface DialogField {
  key: string;
  label: string;
  type: DialogFieldType;
  required?: boolean;
  options?: DialogFieldOption[];
  validators?: any[];
}

// Main dialog configuration
export interface BreakerDialogConfig<T> {
  mode: DialogMode;
  title: string;
  data?: T;
  fields: DialogField[];
}
@Component({
  selector: 'app-breaker-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './breaker-dialog.component.html',
  styleUrl: './breaker-dialog.component.scss'
})

export class BreakerDialogComponent implements OnInit {
    form!: FormGroup;

    constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<BreakerDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public config: BreakerDialogConfig<any>
    ) {}

    ngOnInit() {
      this.buildForm();
    }

    private buildForm() {
      const group: { [key: string]: any } = {};
      this.config.fields.forEach(field => {
        group[field.key] = ['', field.validators || []];
      });
      this.form = this.fb.group(group);

      if (this.config.data) {
        this.form.patchValue(this.config.data);
      }
    }

    getActionButtonText(): string {
      switch(this.config.mode) {
        case 'create': return 'Create';
        case 'edit': return 'Save';
        case 'delete': return 'Delete';
        case 'view': return 'Close';
        default: return 'OK';
      }
    }

    onSubmit() {
      if (this.form.valid) {
        this.dialogRef.close({
          mode: this.config.mode,
          data: this.form.value
        });
      }
    }

    onCancel() {
      this.dialogRef.close();
    }
  }
