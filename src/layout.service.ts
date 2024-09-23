import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type LayoutType = 'default' | 'sidenav';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private layoutSubject = new BehaviorSubject<LayoutType>('default');
  currentLayout$ = this.layoutSubject.asObservable();

  setLayout(layout: LayoutType) {
    this.layoutSubject.next(layout);
  }
}
