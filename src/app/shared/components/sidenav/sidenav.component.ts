

import { Component, effect, input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MenuItem } from '../../data/menu-item.interface';
import { SidenavMenuItemComponent } from '../sidenav-menu-item/sidenav-menu-item.component';
import { SIDENAV_MENU_ITEMS } from '../../data/sidenav-menu-data';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, SidenavMenuItemComponent, MatIconModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  collapsed = input<boolean>(false);

  constructor() {
    // Use the effect to log whenever 'collapsed' changes
    effect(() => {
      console.log('collapsed state changed sidenav component:', this.collapsed());
    });
  }

  menuItems = input<MenuItem[]>([]);
}
