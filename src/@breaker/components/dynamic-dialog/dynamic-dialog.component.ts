import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DialogData, FieldConfig } from '../../models/table-config.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.scss'
})
export class DynamicDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DynamicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const controls = this.data.fields.reduce((acc: { [key: string]: any }, field: FieldConfig) => {
      acc[field.key] = [
        this.data.initialData?.[field.key] || '',
        field.required ? Validators.required : [],
      ];
      return acc;
    }, {});
    this.form = this.fb.group(controls);

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.form.value);
  }
}
