import { Component, input } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MenuItem } from '../../data/menu-item.interface';
import { SidenavMenuItemComponent } from '../sidenav-menu-item/sidenav-menu-item.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [ MatListModule,  SidenavMenuItemComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  collapsed = input<boolean>(false);

  menuItems = input<MenuItem[]>([]);
}
