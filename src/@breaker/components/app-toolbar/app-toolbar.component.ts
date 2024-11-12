import { Component, effect, inject } from '@angular/core';
import { MaterialModules } from '../../../mat-index';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../../app/shared/data/menu-item.interface';
import { TOOLBAR_MENU_ITEMS } from '../../../app/shared/data/toolbar-menu-data';
import { ThemeManager } from '../../../app/theme-manager.service';
import { NavigationService } from '../../../app/core/services/navigation.service';
import { NavItem } from '../../../app/core/models/navigation.types';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [...MaterialModules, RouterModule, CommonModule],
  templateUrl: './app-toolbar.component.html',
  styleUrl: './app-toolbar.component.scss'
})
export class AppToolbarComponent {
  private navigationService = inject(NavigationService);
  themeManager = inject(ThemeManager);

  isDark$ = this.themeManager.isDark$;
  // topNavItems$ = this.navigationService.getNavigation('top');
  adminItems$ = this.navigationService.getNavigation('admin');

  changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }
  topNavItems$ = this.navigationService.getNavigation('top');

  hasTopChildren(item: NavItem): boolean {
    return item.children?.some(child => child.location.includes('top')) ?? false;
  }
  constructor() {
    effect(() => {
      console.log('APP TOOLBAR:');
    });
  }
}
