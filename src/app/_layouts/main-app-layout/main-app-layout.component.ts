import { Component, signal } from '@angular/core';
import { MaterialModules } from '../../..';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface MenuItem {
  icon?: string;
  label: string;
  route?: string;
  subItems?: MenuItem[];

}


@Component({
  selector: 'app-main-app-layout',
  standalone: true,
  imports: [MaterialModules, RouterModule, CommonModule],
  templateUrl: './main-app-layout.component.html',
  styleUrl: './main-app-layout.component.scss'
})
export class MainAppLayoutComponent {

  loading = signal(false);

  menuItems: MenuItem[] = [
    {
      icon: 'folder_open',
      label: 'Portfolios',
      route: 'portfolios',
    },
    {
      icon: 'apps',
      label: 'Applications',
      route: 'applications',
    },
    {
      icon: 'assignment',
      label: 'Projects',
      route: 'projects',
    },
    {
      icon: 'receipt_long',
      label: 'Estimates',
      route: 'estimates',
    },
    {
      icon: 'description',
      label: 'Documents',
      route: 'documents',
      subItems: [
        {
          icon: 'cloud_upload',
          label: 'Document Storage',
          route: 'storage',
        },
        {
          icon: 'history',
          label: 'Legacy Documents',
          route: 'legacy',
        },
      ],
    },
    {
      icon: 'admin_panel_settings',
      label: 'Admin',
      route: 'admin',
      subItems: [
        {
          icon: 'people',
          label: 'User Management',
          route: 'user-management',
        },
        {
          icon: 'assignment_ind',
          label: 'Roles',
          route: 'roles',
        },
        {
          icon: 'cloud',
          label: 'Hosting Resources',
          route: 'admin/hosting-resources',
        },
        {
          icon: 'table_chart',
          label: 'System Lookup Tables',
          route: 'admin/system-lookup-tables',
        },
        {
          icon: 'folder_special',
          label: 'Portfolio Management',
          route: 'admin/portfolio-management',
        },
      ],
    },
  ];
}
