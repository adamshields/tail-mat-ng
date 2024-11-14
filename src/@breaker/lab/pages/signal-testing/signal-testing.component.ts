import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, Signal, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { interval } from 'rxjs';

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
            <!-- <span class="text-lg">Count: {{ count() }}</span>
            <button mat-raised-button (click)="increment()">
              Increment
            </button> -->
            <!-- <button mat-raised-button (click)="count.set(0)">
              Reset
            </button> -->
          </div>

          <div class=" p-4 rounded ">
            <!-- <p>Double: {{ doubled() }}</p>
            <p>Effects Run: {{ effectsRun() }}</p> -->
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

  // count = signal(0);



  // effectsRun = signal(0);

  // doubled = computed(() => this.count() * 2);

  constructor() {

    // signal is a wrapper around a value that notifies consumers then the value changes.
    // Signals can contain any value from primitive to complex data structures
    // you read a signals value by calling its getter function
    // signals can be writable or read-only
    const count = signal(0);
    // Signals are getter functions - calling them reads their value.
    console.log('The count is: ' + count());

    // To change the value of a writable signal, either .set() it directly:
    count.set(3);
    console.log('The count is: ' + count());

    // or use the .update() operation to compute a new value from the previous one:
    count.update(value => value + 1)
    console.log('The count is: ' + count());

    // Writable signals have the type WritableSignal.
    // Computed signals are read-only signals that derive their value from other signals
    // you define computed signals using the computed function specifying a derivation
    // https://next.angular.dev/guide/signals#computed-signals
    const count1: WritableSignal<number> = signal(0);
    count1.set(10)
    console.log('The count1 is: ' + count1());
    const doubledCount: Signal<number> = computed(() => count1() * 2);
    console.log('The doubleCount is: ' + doubledCount());
    // the doubleCount signal depends on the count1 signal. Whenever count1 updates Angular knows doubleCount needs to update as well

    // Computed signal dependencies are dynamic
    // https://next.angular.dev/guide/signals#computed-signal-dependencies-are-dynamic
    // only the signals actually read during the derivation are tracked.
    // for example in this computed the count signal is only read if the showCount signal is true

    const showCount = signal(false);
    const count3 = signal(0);
    const conditionalCount = computed(() => {
      if (showCount()) {
        return `The count is ${count3()}.`;
      } else {
        return 'Nothing to see here!';
      }
    });
    console.log('The conditionalCount is: ' + conditionalCount());

    // When you read conditionalCount, if showCount is false the "Nothing to see here!"
    // message is returned without reading the count signal. This means that if you later
    // update count it will not result in a recomputation of conditionalCount.

    // If you set showCount to true and then read conditionalCount again,
    // the derivation will re-execute and take the branch where showCount is true,
    // returning the message which shows the value of count. Changing count will then invalidate conditionalCount's cached value.

    // Note that dependencies can be removed during a derivation as well as added.
    // If you later set showCount back to false, then count will no longer be considered a dependency of conditionalCount.


    // Reading signals in OnPush components
    // https://next.angular.dev/guide/signals#reading-signals-in-onpush-components
    // When you read a signal within an OnPush component's template,
    // Angular tracks the signal as a dependency of that component. When the value of that signal changes,
    // Angular automatically marks the component to ensure it gets updated the next time change detection runs.
    // Refer to the Skipping component subtrees guide for more information about OnPush components.


    // Effects
    // https://next.angular.dev/guide/signals#effects
    // Signals are useful because the notify interested consumers when they change
    // an Effect is an operation that runs whenever one or more signal values change
    // you can create an effect with the effect function

    effect(() => {
      console.log(`The current count is effect: ${count()}`);
    });


    // Add allowSignalWrites option
    // effect(() => {
    //   console.log(`Count changed to: ${this.count()}`);
    //   this.effectsRun.update(n => n + 1);
    // }, { allowSignalWrites: true }); // Add this option
  };

  // increment() {
  //   this.count.update(n => n + 1);
  // }
}
// Create a signal from an RxJs Observable with toSignal
// https://next.angular.dev/ecosystem/rxjs-interop#create-a-signal-from-an-rxjs-observable-with-tosignal


