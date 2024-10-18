import { Component, effect, inject } from '@angular/core';
import { MaterialModules } from '../../..';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../../app/shared/data/menu-item.interface';
import { TOOLBAR_MENU_ITEMS } from '../../../app/shared/data/toolbar-menu-data';
import { ThemeManager } from '../../../app/theme-manager.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [...MaterialModules, RouterModule, CommonModule],
  templateUrl: './app-toolbar.component.html',
  styleUrl: './app-toolbar.component.scss'
})
export class AppToolbarComponent {


  themeManager = inject(ThemeManager);


  isDark$ = this.themeManager.isDark$;


  changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }


  menuItems: MenuItem[] = TOOLBAR_MENU_ITEMS;





  constructor() {
    effect(() => {
      console.log('APP TOOLBAR:');
    });
  }
}
