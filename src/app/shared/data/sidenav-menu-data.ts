// sidenav-menu-data.ts

import { MenuItem } from '../../shared/data/menu-item.interface';

export const SIDENAV_MENU_ITEMS: MenuItem[] = [
  {
    icon: 'dashboard',
    label: 'Dashboard',
    route: 'dashboard',
  },
  {
    icon: 'settings',
    label: 'Settings',
    route: 'settings',
  },
  {
    icon: 'analytics',
    label: 'Analytics',
    route: 'analytics',
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
      // More sub-items...
    ],
  },
  // More sidenav-specific menu items...
];
