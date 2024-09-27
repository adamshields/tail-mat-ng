
import { Component, effect, input, signal } from '@angular/core';
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
  constructor() {
    // Use the effect to log whenever 'collapsed' changes
    effect(() => {
      console.log('collapsed state changed sidenav menu item:', this.collapsed());
    });
  }
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
