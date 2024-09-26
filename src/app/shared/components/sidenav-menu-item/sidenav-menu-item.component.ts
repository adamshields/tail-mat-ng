/**
 * SidenavMenuItemComponent
 *
 * This component represents a single menu item in the sidenav, with support for nested sub-items.
 * It utilizes Angular Material components and Angular Router for navigation.
 *
 * Inputs:
 * - `item` (MenuItem): The menu item object which includes the label, route, icon, and sub-items (if any).
 * - `collapsed` (boolean): Controls the collapsed state of the sidebar. When `true`, the labels are hidden and only icons are displayed.
 *
 * Signals:
 * - `nestedMenuOpen` (signal<boolean>): A signal that tracks whether the nested sub-items are expanded or collapsed.
 *
 * Methods:
 * - `toggleNested()`: Toggles the nested sub-menu open/closed if the current item has sub-items.
 *
 * Animations:
 * - `expandContractMenu`: A trigger that animates the nested sub-menu items, smoothly expanding or collapsing them with changes in opacity and height.
 *
 * Usage Example:
 *
 * <app-sidenav-menu-item
 *   [item]="menuItem"
 *   [collapsed]="isCollapsed"
 * ></app-sidenav-menu-item>
 *
 * Example `MenuItem` Structure:
 *
 * interface MenuItem {
 *   label: string;
 *   route: string;
 *   icon: string;
 *   subItems?: MenuItem[];
 * }
 */

import { Component, input, signal } from '@angular/core';
import { MenuItem } from '../../data/menu-item.interface';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sidenav-menu-item',
  standalone: true,
  imports: [RouterModule, MatListModule, MatIcon],
  templateUrl: './sidenav-menu-item.component.html',
  styleUrl: './sidenav-menu-item.component.scss',
  animations: [
    trigger('expandContractMenu', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ opacity: 0, height: 0 }))
      ])
    ])
  ]
})
export class SidenavMenuItemComponent {

  /**
   * The menu item object containing the icon, label, route, and optionally sub-items.
   */
  item = input.required<MenuItem>();

  /**
   * Boolean value indicating whether the sidenav is collapsed.
   * If true, only icons are displayed and labels are hidden.
   */
  collapsed = input<boolean>(false);

  /**
   * A signal that tracks whether the nested sub-menu is open.
   */
  nestedMenuOpen = signal(false);

  /**
   * Toggles the visibility of the nested sub-menu.
   * Only executes if the current menu item has sub-items.
   */
  toggleNested() {
    if (!this.item().subItems) {
      return;
    }
    this.nestedMenuOpen.set(!this.nestedMenuOpen());
  }
}
