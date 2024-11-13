import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';

// pages/rxjs-playground/rxjs-playground.component.ts
@Component({
  selector: 'app-rxjs-playground',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-4">
      <mat-card>
        <mat-card-header>
          <mat-icon matCardAvatar>transform</mat-icon>
          <mat-card-title>RxJS Playground</mat-card-title>
          <mat-card-subtitle>Signal and RxJS Integration</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content class="p-4 space-y-4">
          <div class="flex items-center gap-4">
            <span>Observable Value: {{ value$ | async }}</span>
            <span>Signal Value: {{ signalValue() }}</span>
            <button mat-raised-button color="accent" (click)="update()">
              Update
            </button>
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
export class RxjsPlaygroundComponent {
  private subject = new BehaviorSubject<number>(0);
  value$ = this.subject.asObservable();

  signalValue = toSignal(this.value$, { initialValue: 0 });

  update() {
    this.subject.next(this.subject.value + 1);
  }
}
