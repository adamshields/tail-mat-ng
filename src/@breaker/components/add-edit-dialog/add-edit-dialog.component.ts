import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData, FieldConfig } from '../../models/table-config.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-dialog.component.html',
  styleUrl: './add-edit-dialog.component.scss'
})
export class AddEditDialogComponent implements OnInit {
  form: FormGroup = this.fb.group({}); // Initialize as empty

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.buildForm(this.data.fields, this.data.initialData || {});
  }

  buildForm(fields: FieldConfig[], initialData: any): void {
    if (!fields || fields.length === 0) {
      console.warn('No fields provided for the form!');
      return;
    }

    const formControls: { [key: string]: any } = {};

    fields.forEach((field) => {
      formControls[field.key] = [
        initialData[field.key] || '',
        this.getValidators(field),
      ];
    });

    this.form = this.fb.group(formControls);
  }

  getValidators(field: FieldConfig): any[] {
    const validators = [];
    if (field.required) validators.push(Validators.required);
    if (field.validations?.minLength)
      validators.push(Validators.minLength(field.validations.minLength));
    if (field.validations?.maxLength)
      validators.push(Validators.maxLength(field.validations.maxLength));
    if (field.validations?.pattern)
      validators.push(Validators.pattern(field.validations.pattern));
    return validators;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
