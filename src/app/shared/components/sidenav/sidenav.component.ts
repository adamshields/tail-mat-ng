import { Component, computed, effect, inject, input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MenuItem } from '../../data/menu-item.interface';
import { SidenavMenuItemComponent } from '../sidenav-menu-item/sidenav-menu-item.component';
import { SIDENAV_MENU_ITEMS } from '../../data/sidenav-menu-data';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, SidenavMenuItemComponent, MatIconModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
/**
 * SidenavComponent is responsible for rendering the sidenav menu, controlling its collapsed state,
 * and determining which menu items should be active based on the current route.
 */
export class SidenavComponent {

  /**
   * Input that controls whether the sidenav is collapsed or expanded.
   */
  collapsed = input<boolean>(false);

  /**
   * Input array of MenuItem objects to be displayed in the sidenav.
   * Defaults to the static SIDENAV_MENU_ITEMS array.
   */
  menuItems = input<MenuItem[]>(SIDENAV_MENU_ITEMS);

  /**
   * Router service injected to listen for navigation events.
   */
  private router = inject(Router);

  /**
   * Reactive signal that holds the current URL after any redirects.
   * It updates whenever a NavigationEnd event occurs.
   */
  private currentUrl = toSignal(this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event: NavigationEnd) => event.urlAfterRedirects)
  ), { initialValue: '/' });

  /**
   * Computed property that returns the active menu items based on the current URL.
   * It filters the available menu items to show only the ones that match the current path.
   */
  activeMenuItems = computed(() => {
    const currentPath = this.currentUrl();
    return this.menuItems().filter(item => this.shouldShowMenuItem(item, currentPath));
  });

  /**
   * Constructor initializes the component and sets up an effect to log the current URL and active menu items
   * whenever they change.
   */
  constructor() {
    effect(() => {
      console.log('Current URL:', this.currentUrl());
      console.log('Active menu items:', this.activeMenuItems());
    });
  }

  /**
   * Determines whether a menu item should be shown as active based on the current route.
   * If the current route matches the item's route or one of its subItems' routes, the item will be shown.
   * Additional custom logic (e.g., permission checks) can be added here.
   *
   * @param {MenuItem} item - The menu item to check.
   * @param {string} currentPath - The current path from the router.
   * @returns {boolean} - Returns true if the menu item should be active, false otherwise.
   */
  private shouldShowMenuItem(item: MenuItem, currentPath: string): boolean {
    if (item.route && currentPath.startsWith('/' + item.route)) {
      return true;
    }
    if (item.subItems) {
      return item.subItems.some(subItem =>
        currentPath.startsWith('/' + item.route + '/' + subItem.route)
      );
    }
    // Add any additional logic here (e.g., checking user permissions)
    return true;
  }
}
