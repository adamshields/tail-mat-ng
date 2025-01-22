import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-testing',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<h1 class="text-2xl font-bold mb-6">Form Testing</h1>




<form [formGroup]="testForm"
      (ngSubmit)="onSubmit()"
      class="flex flex-col space-y-6 w-full max-w-sm mx-auto">


<mat-form-field
  class="w-full bg-transparent focus:outline-none hover:bg-transparent active:bg-transparent focus:bg-transparent cursor-default"
  appearance="fill"
  floatLabel="always">
  <mat-label>
    <mat-icon class="text-sm w-2 h-2 p-0 box-content inline-block text-gray-400 dark:text-gray-500">lock</mat-icon>
    Name
  </mat-label>
  <input
    matInput
    formControlName="fname"
    [readonly]="true"
    class=""/>
</mat-form-field>

  <mat-form-field class="w-full" appearance="outline">
    <mat-label>Name</mat-label>
    <input matInput formControlName="name" placeholder="Enter your name"
           class="p-2 text-base" />
    <mat-error *ngIf="testForm.controls.name.invalid && testForm.controls.name.touched"
               class="text-red-500 text-sm">
      Name is required.
    </mat-error>
  </mat-form-field>

  <mat-form-field class="w-full" appearance="outline">
    <mat-label>Email</mat-label>
    <input matInput type="email" formControlName="email" placeholder="Enter your email"
           class="p-2 text-base" />
    <mat-error *ngIf="testForm.controls.email.invalid && testForm.controls.email.touched"
               class="text-red-500 text-sm">
      A valid email is required.
    </mat-error>
  </mat-form-field>

  <button mat-raised-button color="primary" type="submit"
          [disabled]="testForm.invalid"
          class="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed">
    Submit
  </button>
</form>

<div *ngIf="submittedData"
     class="mt-8 p-4 border border-primary primary-container rounded shadow ">
  <h2 class="text-xl font-semibold mb-2">Submitted Data</h2>
  <pre class="bg-secondary-container p-2 rounded text-sm">{{ submittedData | json }}</pre>
</div>
  `,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class FormTestingComponent {
  testForm = new FormGroup({
    fname: new FormControl('ssssss', { nonNullable: true, validators: [Validators.required] }),
    name: new FormControl('Adam', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('adam@gmail.com', { nonNullable: true, validators: [Validators.required, Validators.email] }),
  });

  submittedData: { name: string; email: string } | null = null;

  onSubmit() {
    if (this.testForm.valid) {
      this.submittedData = this.testForm.value as { name: string; email: string };
    }
  }
}
