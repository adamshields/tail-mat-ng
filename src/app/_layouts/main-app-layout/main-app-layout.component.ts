import { Component, computed, effect, inject, signal } from '@angular/core';
import { MaterialModules } from '../../..';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeManager } from '../../theme-manager.service';
import { ColorPickerComponent } from "../../shared/components/color-picker/color-picker.component";
import { SidenavComponent } from '../../shared/components/sidenav/sidenav.component';
import { MenuItem } from '../../shared/data/menu-item.interface';
import { TOOLBAR_MENU_ITEMS } from '../../shared/data/toolbar-menu-data';
import { SIDENAV_MENU_ITEMS } from '../../shared/data/sidenav-menu-data';
import { SidenavService } from '../../shared/services/sidenav.service';
import { filter, map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-main-app-layout',
  standalone: true,
  imports: [MaterialModules, RouterModule, CommonModule, ColorPickerComponent, SidenavComponent],
  templateUrl: './main-app-layout.component.html',
  styleUrl: './main-app-layout.component.scss'
})
/**
 * MainAppLayoutComponent is the root layout component responsible for managing the main layout
 * of the application. It includes a toolbar, sidenav, and content area. The component also
 * handles theme changes and sidenav visibility.
 */
export class MainAppLayoutComponent {

  /**
   * Injected SidenavService used to control the visibility of the sidenav.
   */
  private sidenavService = inject(SidenavService);

  /**
   * Signal representing whether the sidenav is collapsed or expanded.
   * Defaults to `false` (expanded).
   */
  collapsed = signal(false);

  /**
   * Signal representing the loading state of the layout.
   * Can be used to show or hide a loading indicator.
   */
  loading = signal(false);

  /**
   * Computed signal that dynamically calculates the width of the sidenav based
   * on its collapsed state.
   * @returns {string} - '65px' if collapsed, '250px' if expanded.
   */
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

  /**
   * Signal that tracks whether the sidenav should be shown or hidden,
   * derived from the SidenavService's `showSidenav$` observable.
   */
  showSidenav = toSignal(this.sidenavService.showSidenav$);

  /**
   * Injected ThemeManager service used to manage the application's theme.
   */
  themeManager = inject(ThemeManager);

  /**
   * Observable that tracks whether the current theme is dark mode.
   * This can be used to dynamically switch styles or components based on the theme.
   */
  isDark$ = this.themeManager.isDark$;

  /**
   * Method to change the application's theme. The theme string should correspond
   * to the available themes defined in the ThemeManager.
   * @param {string} theme - The name of the theme to apply.
   */
  changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }

  /**
   * Array of menu items to be displayed in the toolbar.
   */
  menuItems: MenuItem[] = TOOLBAR_MENU_ITEMS;

  /**
   * Array of menu items to be displayed in the sidenav.
   */
  sideNavItems: MenuItem[] = SIDENAV_MENU_ITEMS;

  /**
   * Constructor that sets up reactive effects in the component.
   * Logs the current sidenav visibility state whenever it changes.
   */
  constructor() {
    effect(() => {
      console.log('Sidenav visibility changed:', this.showSidenav());
    });
  }
}
