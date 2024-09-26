/**
 * MainAppLayoutComponent
 *
 * This component serves as the main layout for the application, containing a toolbar, sidenav, and
 * dynamic content via the router outlet. It integrates theme management, a sidebar navigation system,
 * and a toolbar with menu items and profile actions.
 *
 * Inputs:
 * - None directly, but several internal signals and theme manager are used.
 *
 * Properties:
 * - `themeManager` (ThemeManager): Injected service for managing theme switching (dark, light, or auto).
 * - `isDark$` (Observable<boolean>): Observable to track the current theme mode (dark or light).
 * - `loading` (signal<boolean>): Tracks the loading state of the app (e.g., for loading spinners).
 * - `collapsed` (signal<boolean>): Determines whether the sidenav is collapsed or expanded.
 * - `sidenavWidth` (computed<string>): Computes the sidenav width based on the collapsed state (either '65px' or '250px').
 * - `menuItems` (MenuItem[]): Array of toolbar menu items imported from `TOOLBAR_MENU_ITEMS`.
 *
 * Methods:
 * - `changeTheme(theme: string)`: Changes the application theme (options: 'light', 'dark', or 'auto').
 *
 * Usage Example:
 *
 * <app-main-app-layout></app-main-app-layout>
 *
 * The component integrates the `SidenavComponent` for the sidebar menu, `ColorPickerComponent` for theme color selection,
 * and manages dynamic routing content via `router-outlet`.
 */

import { Component, computed, inject, signal } from '@angular/core';
import { MaterialModules } from '../../..';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeManager } from '../../theme-manager.service';
import { ColorPickerComponent } from "../../shared/components/color-picker/color-picker.component";
import { SidenavComponent } from '../../shared/components/sidenav/sidenav.component';
import { MenuItem } from '../../shared/data/menu-item.interface';
import { TOOLBAR_MENU_ITEMS } from '../../shared/data/toolbar-menu-data';
import { SIDENAV_MENU_ITEMS } from '../../shared/data/sidenav-menu-data';

@Component({
  selector: 'app-main-app-layout',
  standalone: true,
  imports: [MaterialModules, RouterModule, CommonModule, ColorPickerComponent, SidenavComponent],
  templateUrl: './main-app-layout.component.html',
  styleUrl: './main-app-layout.component.scss'
})
export class MainAppLayoutComponent {

  /**
   * Theme manager service to handle theme changes (auto, light, dark).
   */
  themeManager = inject(ThemeManager);

  /**
   * Observable that tracks whether the current theme is dark mode.
   */
  isDark$ = this.themeManager.isDark$;

  /**
   * Changes the theme based on the input parameter ('light', 'dark', or 'auto').
   *
   * @param theme The theme to switch to.
   */
  changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }

  /**
   * Signal to indicate whether the application is currently loading.
   */
  loading = signal(false);

  /**
   * Signal to track whether the sidenav is collapsed.
   */
  collapsed = signal(false);
  /**
   * Toggles the collapsed state.
   */
  toggleCollapse() {
    this.collapsed.set(!this.collapsed());
  }
  /**
   * Computed property that returns the sidenav width based on whether it's collapsed or not.
   * Returns '65px' when collapsed and '250px' when expanded.
   */
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));

  /**
   * Array of toolbar menu items (routes, labels, and icons) imported from `TOOLBAR_MENU_ITEMS`.
   */
  menuItems: MenuItem[] = TOOLBAR_MENU_ITEMS;

  /**
   * Array of sidenav menu items (routes, labels, and icons) imported from `TOOLBAR_MENU_ITEMS`.
   */
  sideNavItems: MenuItem[] = SIDENAV_MENU_ITEMS

}
