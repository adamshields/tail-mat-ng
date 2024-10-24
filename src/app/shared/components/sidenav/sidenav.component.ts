// sidenav.component.ts
import { Component, computed, inject, input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
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
  imports: [
    MatListModule,
    MatSidenavModule,
    SidenavMenuItemComponent,
    MatIconModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  collapsed = signal(false);
  menuItems = input<MenuItem[]>(SIDENAV_MENU_ITEMS);

  private router = inject(Router);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

  private currentUrl = toSignal(this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event: NavigationEnd) => event.urlAfterRedirects)
  ), { initialValue: '/' });

  activeMenuItems = computed(() => {
    const currentPath = this.currentUrl();
    return this.menuItems().filter(item => this.shouldShowMenuItem(item, currentPath));
  });

  toggleCollapsed() {
    this.collapsed.set(!this.collapsed());
  }

  private shouldShowMenuItem(item: MenuItem, currentPath: string): boolean {
    if (item.route && currentPath.startsWith('/' + item.route)) {
      return true;
    }
    if (item.subItems) {
      return item.subItems.some(subItem =>
        currentPath.startsWith('/' + item.route + '/' + subItem.route)
      );
    }
    return true;
  }
}
