import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// pages/signal-testing/signal-testing.component.ts
@Component({
  selector: 'app-signal-testing',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-4">
      <mat-card>
        <mat-card-header>
          <mat-icon matCardAvatar>bolt</mat-icon>
          <mat-card-title>Signal Testing</mat-card-title>
          <mat-card-subtitle>Exploring Signal Patterns</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content class="p-4 space-y-4">
          <div class="flex items-center gap-4">
            <span class="text-lg">Count: {{ count() }}</span>
            <button mat-raised-button (click)="increment()">
              Increment
            </button>
            <button mat-raised-button (click)="count.set(0)">
              Reset
            </button>
          </div>

          <div class=" p-4 rounded ">
            <p>Double: {{ doubled() }}</p>
            <p>Effects Run: {{ effectsRun() }}</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class SignalTestingComponent {
  count = signal(0);
  effectsRun = signal(0);

  doubled = computed(() => this.count() * 2);

  constructor() {
    // Add allowSignalWrites option
    effect(() => {
      console.log(`Count changed to: ${this.count()}`);
      this.effectsRun.update(n => n + 1);
    }, { allowSignalWrites: true }); // Add this option
  }

  increment() {
    this.count.update(n => n + 1);
  }
}
