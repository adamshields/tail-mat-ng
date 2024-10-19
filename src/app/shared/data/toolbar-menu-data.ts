// toolbar-menu-data.ts

import { MenuItem } from '../../shared/data/menu-item.interface';

export const TOOLBAR_MENU_ITEMS: MenuItem[] = [
  {
    icon: 'folder_open',
    label: 'Portfolios',
    route: 'portfolios',
  },
  {
    icon: 'trending_up',
    label: 'Test',
    route: 'test',
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
