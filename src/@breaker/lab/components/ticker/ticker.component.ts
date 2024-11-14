import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { interval } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';


// Create a signal from an RxJs Observable with toSignal
// https://next.angular.dev/ecosystem/rxjs-interop#create-a-signal-from-an-rxjs-observable-with-tosignal
// use to theSignal function to create a signal which tracks the value of an observable
// it behaves similar to the async pipe in templates but is more flexible and can be used anywhere in the application
// Like the async pipe, toSignal subscribes to the Observable immediately, which may trigger side effects.
// The subscription created by toSignal automatically unsubscribes from the given Observable when the component or service which calls toSignal is destroyed.




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

  constructor() {
    const mySignal = signal(0);
    const obs$ = toObservable(mySignal);
    obs$.subscribe(value => console.log(value));
    mySignal.set(1);
    mySignal.set(2);
    mySignal.set(3);
  }

}
