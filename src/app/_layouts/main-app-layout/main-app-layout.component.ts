import { Component, computed, effect, inject, signal, ViewChild } from '@angular/core';
import { MaterialModules } from '../../../mat-index';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeManager } from '../../theme-manager.service';
import { ColorPickerComponent } from "../../shared/components/color-picker/color-picker.component";
import { SidenavComponent } from '../../shared/components/sidenav/sidenav.component';
import { MenuItem } from '../../shared/data/menu-item.interface';

import { SIDENAV_MENU_ITEMS } from '../../shared/data/sidenav-menu-data';
import { SidenavService } from '../../shared/services/sidenav.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ResponsiveHelperComponent } from '../../../@breaker/components/responsive-helper/responsive-helper.component';
import { AppToolbarComponent } from "../../../@breaker/components/app-toolbar/app-toolbar.component";
import { NavigationService } from '../../core/services/navigation.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-main-app-layout',
  standalone: true,
  imports: [...MaterialModules, RouterModule, CommonModule, ColorPickerComponent, SidenavComponent, ResponsiveHelperComponent, AppToolbarComponent],
  templateUrl: './main-app-layout.component.html',
  styleUrl: './main-app-layout.component.scss'
})

export class MainAppLayoutComponent {


  private navigationService = inject(NavigationService);
  private themeManager = inject(ThemeManager);

  collapsed = signal(false);
  loading = signal(false);
  isDark$ = this.themeManager.isDark$;
  onCollapsedChange(isCollapsed: boolean) {
    this.collapsed.set(isCollapsed);
  }
  // New signal to track if we have sidenav items
  hasSideNavItems = signal(false);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

  // New computed signal for content margin
  contentMargin = computed(() => {
    if (!this.hasSideNavItems()) return '0px';
    return this.collapsed() ? '65px' : '250px';
  });

  constructor() {
    // Subscribe to navigation changes to update hasSideNavItems
    this.navigationService.getSideNavigation().pipe(
      map(items => items.length > 0)
    ).subscribe(hasItems => {
      this.hasSideNavItems.set(hasItems);
    });

    effect(() => {
      console.log('Sidenav state:', {
        collapsed: this.collapsed(),
        hasItems: this.hasSideNavItems(),
        width: this.sidenavWidth(),
        margin: this.contentMargin()
      });
    });
  }

  toggleCollapsed() {
    this.collapsed.update(v => !v);
  }

  changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }
}
