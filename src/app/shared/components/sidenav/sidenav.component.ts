/**
 * SidenavComponent
 *
 * This component represents the entire sidenav structure and is responsible for rendering
 * a list of navigation menu items. It integrates the `SidenavMenuItemComponent` for each menu item
 * and handles the collapsed/expanded state of the sidebar.
 *
 * Inputs:
 * - `collapsed` (boolean): Controls whether the sidebar is in a collapsed state.
 *
 * Properties:
 * - `menuItems` (MenuItem[]): Array of menu items that are rendered within the sidenav.
 *   These are imported from the `SIDENAV_MENU_ITEMS` constant.
 *
 * Usage Example:
 *
 * <app-sidenav [collapsed]="isSidebarCollapsed"></app-sidenav>
 *
 * The `SidenavComponent` renders each menu item using the `SidenavMenuItemComponent` and
 * passes the collapsed state to each item.
 */

import { Component, input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MenuItem } from '../../data/menu-item.interface';
import { SidenavMenuItemComponent } from '../sidenav-menu-item/sidenav-menu-item.component';
import { SIDENAV_MENU_ITEMS } from '../../data/sidenav-menu-data';

/**
 * SidenavComponent
 *
 * This component represents the sidebar navigation menu (sidenav) in the application.
 * It receives a list of menu items and a collapsed state as inputs, allowing dynamic
 * rendering of the sidebar's menu items and the ability to toggle between a collapsed and expanded state.
 *
 * Inputs:
 * - `collapsed` (boolean): Controls the state of the sidenav. When `true`, the sidenav is collapsed, showing only icons.
 *   When `false`, it is expanded, showing both icons and labels.
 * - `menuItems` (MenuItem[]): An array of `MenuItem` objects representing the items to be displayed in the sidenav.
 *   This allows dynamic configuration of the sidenav content.
 *
 * Properties:
 * - `collapsed` (input<boolean>): Tracks whether the sidenav is in a collapsed state.
 * - `menuItems` (input<MenuItem[]>): Array of menu items to render in the sidenav, each menu item containing route, label, icon, and optional sub-items.
 *
 * Example Usage:
 *
 * <app-sidenav [collapsed]="isSidebarCollapsed" [menuItems]="sideNavItems"></app-sidenav>
 *
 * In this example, `isSidebarCollapsed` would control whether the sidenav is collapsed or not, and `sideNavItems`
 * would provide the menu items to be displayed in the sidenav.
 */

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, SidenavMenuItemComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  /**
   * Input boolean that controls the collapsed state of the sidenav.
   * When true, the sidebar shows only icons, and the labels are hidden.
   */
  collapsed = input<boolean>(false);

  /**
   * Array of menu items that are displayed in the sidenav. This is passed in as an input, allowing
   * the parent component to dynamically provide the sidenav items.
   */
  menuItems = input<MenuItem[]>([]);
}
