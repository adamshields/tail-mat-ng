// sidenav.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private _showSidenav = new BehaviorSubject<boolean | null>(null);
  showSidenav$ = this._showSidenav.asObservable();

  setSidenavVisibility(isVisible: boolean | null) {
    this._showSidenav.next(isVisible);
  }

  resetSidenavVisibility() {
    this._showSidenav.next(null);
  }
}
