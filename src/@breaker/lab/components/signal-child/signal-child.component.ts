import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// components/signal-child/signal-child.component.ts
@Component({
  selector: 'app-signal-child',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Signal Child</mat-card-title>
      </mat-card-header>

      <mat-card-content class="p-4">
        <div class="space-y-2">
          <p>Parent Value: {{ parentCount() }}</p>
          <p>Local Value: {{ localCount() }}</p>

          <div class="space-x-2">
            <button mat-button (click)="increment()">
              Update Local
            </button>
            <button mat-button (click)="emit()">
              Send to Parent
            </button>
          </div>
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
export class SignalChildComponent {
  parentCount = input<number>();
  childEvent = output<number>();

  localCount = signal(0);

  increment() {
    this.localCount.update(n => n + 1);
  }

  emit() {
    this.childEvent.emit(this.localCount());
  }
}
