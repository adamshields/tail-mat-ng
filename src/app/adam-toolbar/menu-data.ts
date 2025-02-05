// menu-data
export const menuItems = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: '/dashboard',
  },
  {
    label: 'Projects',
    icon: 'folder',
    route: '/lab',
    subItems: [
      { label: 'Active Projects', icon: 'folder_open', route: 'lab' },
      { label: 'Archived Projects', icon: 'archive', route: 'archived' },
    ],
  },
  {
    label: 'Users',
    icon: 'people',
    route: '/users',
    subItems: [
      { label: 'Admins', icon: 'admin_panel_settings', route: 'admins' },
      { label: 'Members', icon: 'group', route: 'members' },
      { label: 'Guests', icon: 'person_outline', route: 'guests' },
    ],
  },
  {
    label: 'Settings',
    icon: 'settings',
    route: '/settings',
    subItems: [
      { label: 'Profile Settings', icon: 'person', route: 'profile' },
      { label: 'Security', icon: 'security', route: 'security' },
      { label: 'Preferences', icon: 'tune', route: 'preferences' },
    ],
  },
  {
    label: 'Reports',
    icon: 'bar_chart',
    route: '/reports',
  },
  {
    label: 'Help',
    icon: 'help_outline',
    route: '/help',
  },
];
