import { Component, computed, effect, inject, signal } from '@angular/core';
import { MaterialModules } from '../../..';
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

@Component({
  selector: 'app-main-app-layout',
  standalone: true,
  imports: [...MaterialModules, RouterModule, CommonModule, ColorPickerComponent, SidenavComponent, ResponsiveHelperComponent, AppToolbarComponent],
  templateUrl: './main-app-layout.component.html',
  styleUrl: './main-app-layout.component.scss'
})

export class MainAppLayoutComponent {


  private sidenavService = inject(SidenavService);


  collapsed = signal(false);


  loading = signal(false);


  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');


  showSidenav = toSignal(this.sidenavService.showSidenav$);


  themeManager = inject(ThemeManager);


  isDark$ = this.themeManager.isDark$;


  changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }


  // menuItems: MenuItem[] = TOOLBAR_MENU_ITEMS;


  sideNavItems: MenuItem[] = SIDENAV_MENU_ITEMS;


  constructor() {
    effect(() => {
      console.log('Sidenav visibility changed:', this.showSidenav());
    });
  }
}
