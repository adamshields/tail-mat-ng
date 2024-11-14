import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { interval } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';


// Create a signal from an RxJs Observable with toSignal
// https://next.angular.dev/ecosystem/rxjs-interop#create-a-signal-from-an-rxjs-observable-with-tosignal

@Component({
  selector: 'app-ticker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `{{ counter() }}`,
})
export class Ticker {
  counterObservable = interval(1000);
  // Get a `Signal` representing the `counterObservable`'s value.
  counter = toSignal(this.counterObservable, {initialValue: 0});
}
