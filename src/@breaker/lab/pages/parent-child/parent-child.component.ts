import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { RxjsChildComponent } from '../../components/rxjs-child/rxjs-child.component';
import { SignalChildComponent } from '../../components/signal-child/signal-child.component';

// pages/parent-child/parent-child.component.ts
@Component({
  selector: 'app-parent-child',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-4">
      <mat-card>
        <mat-card-header>
          <mat-icon matCardAvatar>account_tree</mat-icon>
          <mat-card-title>Parent Child Communication</mat-card-title>
        </mat-card-header>

        <mat-card-content class="p-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <app-signal-child
              [parentCount]="parentCount()"
              (childEvent)="onChildEvent($event)"
            />

            <app-rxjs-child
              [value$]="childValue$"
              (valueChange)="onRxjsChildEvent($event)"
            />
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    SignalChildComponent,
    RxjsChildComponent
  ]
})
export class ParentChildComponent {
  parentCount = signal(0);
  private childSubject = new BehaviorSubject<number>(0);
  childValue$ = this.childSubject.asObservable();

  onChildEvent(value: number) {
    this.parentCount.set(value);
  }

  onRxjsChildEvent(value: number) {
    this.childSubject.next(value);
  }
}
