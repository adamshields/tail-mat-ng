import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

// components/rxjs-child/rxjs-child.component.ts
@Component({
  selector: 'app-rxjs-child',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>RxJS Child</mat-card-title>
      </mat-card-header>

      <mat-card-content class="p-4">
        <div class="space-y-2">
          <p>Observable Value: {{ value$ | async }}</p>
          <p>Local Signal: {{ localValue() }}</p>

          <button mat-button (click)="update()">
            Update & Emit
          </button>
        </div>
      </mat-card-content>
    </mat-card>
    `,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,

  ]
})
export class RxjsChildComponent {
  @Input({ required: true }) value$!: Observable<number>;
  @Output() valueChange = new EventEmitter<number>();

  localValue = signal(0);

  update() {
    const newValue = this.localValue() + 1;
    this.localValue.set(newValue);
    this.valueChange.emit(newValue);
  }
}
