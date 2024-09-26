import { Component, computed, inject, signal } from '@angular/core';
import { MaterialModules } from '../../..';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeManager } from '../../theme-manager.service';
import { ColorPickerComponent } from "../../shared/components/color-picker/color-picker.component";
import { SidenavComponent } from '../../shared/components/sidenav/sidenav.component';
import { MenuItem } from '../../shared/data/menu-item.interface';
import { TOOLBAR_MENU_ITEMS } from '../../shared/data/toolbar-menu-data';



@Component({
  selector: 'app-main-app-layout',
  standalone: true,
  imports: [MaterialModules, RouterModule, CommonModule, ColorPickerComponent, SidenavComponent],
  templateUrl: './main-app-layout.component.html',
  styleUrl: './main-app-layout.component.scss'
})
export class MainAppLayoutComponent {

  themeManager = inject(ThemeManager);
  isDark$ = this.themeManager.isDark$;

  changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }

  loading = signal(false);
  collapsed = signal(false);
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));

  menuItems: MenuItem[] = TOOLBAR_MENU_ITEMS;
//   menuItems: MenuItem[] = [
//     {
//       icon: 'folder_open',
//       label: 'Portfolios',
//       route: 'portfolios',
//     },
//     {
//       icon: 'apps',
//       label: 'Applications',
//       route: 'applications',
//     },
//     {
//       icon: 'assignment',
//       label: 'Projects',
//       route: 'projects',
//     },
//     {
//       icon: 'receipt_long',
//       label: 'Estimates',
//       route: 'estimates',
//     },
//     {
//       icon: 'description',
//       label: 'Documents',
//       route: 'documents',
//       subItems: [
//         {
//           icon: 'cloud_upload',
//           label: 'Document Storage',
//           route: 'storage',
//         },
//         {
//           icon: 'history',
//           label: 'Legacy Documents',
//           route: 'legacy',
//         },
//       ],
//     },
//     {
//       icon: 'admin_panel_settings',
//       label: 'Admin',
//       route: 'admin',
//       subItems: [
//         {
//           icon: 'people',
//           label: 'User Management',
//           route: 'user-management',
//         },
//         {
//           icon: 'assignment_ind',
//           label: 'Roles',
//           route: 'roles',
//         },
//         {
//           icon: 'cloud',
//           label: 'Hosting Resources',
//           route: 'admin/hosting-resources',
//         },
//         {
//           icon: 'table_chart',
//           label: 'System Lookup Tables',
//           route: 'admin/system-lookup-tables',
//         },
//         {
//           icon: 'folder_special',
//           label: 'Portfolio Management',
//           route: 'admin/portfolio-management',
//         },
//       ],
//     },
//   ];
}
