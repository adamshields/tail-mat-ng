import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { MaterialModules } from '../../../mat-index';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../../app/shared/data/menu-item.interface';
import { TOOLBAR_MENU_ITEMS } from '../../../app/shared/data/toolbar-menu-data';
import { ThemeManager } from '../../../app/theme-manager.service';
import { NavigationService } from '../../../app/core/services/navigation.service';

import { ColorPaletteComponent } from '../../../app/_pages/color-palette/color-palette.component';
import { ColorPickerComponent } from "../../../app/shared/components/color-picker/color-picker.component";
import { NavItem } from '../../../app/core/models/navigation.types';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...MaterialModules, RouterModule, CommonModule, ColorPaletteComponent, ColorPickerComponent],
  templateUrl: './app-toolbar.component.html',
  styleUrl: './app-toolbar.component.scss'
})
export class AppToolbarComponent {
  private navigationService = inject(NavigationService);
  themeManager = inject(ThemeManager);

  isDark$ = this.themeManager.isDark$;
  // topNavItems$ = this.navigationService.getNavigation('top');
  // adminItems$ = this.navigationService.getNavigation('admin');

  changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }
  horizontalNavItems = input.required<NavItem[]>();

  hasDropdown(item: NavItem): boolean {
    return item.children?.some(child =>
      child.displayType.includes('dropdown')
    ) ?? false;
  }

  getDropdownItems(item: NavItem): NavItem[] {
    return item.children?.filter(child =>
      child.displayType.includes('dropdown')
    ) ?? [];
  }
  constructor() {
    effect(() => {
      console.log('APP TOOLBAR:');
    });
  }
}
