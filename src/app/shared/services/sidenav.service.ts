import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**
 * SidenavService is responsible for managing the visibility state of the sidenav.
 * It determines whether the sidenav should be shown or hidden based on route data
 * and also provides methods to manually set or reset the visibility state.
 */
export class SidenavService {

  /**
   * Router service injected to listen to navigation events.
   */
  private router = inject(Router);

  /**
   * ActivatedRoute service injected to access route-specific data.
   */
  private activatedRoute = inject(ActivatedRoute);

  /**
   * BehaviorSubject to store the current state of the sidenav visibility.
   * The initial value is set to `false`, meaning the sidenav is hidden by default.
   * @private
   */
  private _showSidenav = new BehaviorSubject<boolean>(false);

  /**
   * Observable that exposes the current sidenav visibility state.
   * Can be subscribed to by components to reactively show or hide the sidenav.
   */
  showSidenav$ = this._showSidenav.asObservable();

  /**
   * Constructor initializes the service, subscribing to router events and updating
   * the sidenav visibility based on route data whenever a navigation ends.
   */
  constructor() {
    console.log('SidenavService constructor called');

    // Subscribe to Router events and update the sidenav visibility on NavigationEnd
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const shouldShow = this.getRouteData();
      console.log('Navigation ended, sidenav should show:', shouldShow);
      this._showSidenav.next(shouldShow); // Emit the new sidenav visibility state
    });
  }

  /**
   * Retrieves the `showSidenav` value from the route data of the current route.
   * Traverses the child routes to find the deepest route and checks if the `showSidenav`
   * data property is defined. Defaults to `false` if not explicitly set.
   * @returns {boolean} - Whether the sidenav should be shown for the current route.
   */
  private getRouteData(): boolean {
    let route = this.activatedRoute.snapshot.firstChild;
    while (route?.firstChild) {
      route = route.firstChild; // Traverse to the deepest child route
    }
    const showSidenav = route?.data?.['showSidenav'] ?? false; // Default to false
    console.log('getRouteData called, showSidenav:', showSidenav);
    return showSidenav;
  }

  /**
   * Manually sets the sidenav visibility to a given value.
   * @param {boolean} isVisible - Pass `true` to show the sidenav or `false` to hide it.
   */
  setSidenavVisibility(isVisible: boolean) {
    console.log('setSidenavVisibility called with:', isVisible);
    this._showSidenav.next(isVisible); // Emit the new visibility state
  }

  /**
   * Resets the sidenav visibility based on the current route data.
   * This can be used to re-evaluate the route and reset the visibility after a manual override.
   */
  resetSidenavVisibility() {
    const showSidenav = this.getRouteData();
    console.log('resetSidenavVisibility called, new value:', showSidenav);
    this._showSidenav.next(showSidenav); // Emit the visibility state based on route data
  }
}
