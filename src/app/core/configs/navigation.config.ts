import { NavItem } from "../models/navigation.types";

export const SITE_NAVIGATION: NavItem[] = [
  // portofolio section
  {
    id: 'portfolios',
    label: 'Portfolios',
    path: '/portfolios',
    icon: 'folder_open',
    location: ['top'],

  },
  // test section
  {
    id: 'test',
    label: 'Test',
    path: '/test',
    icon: 'trending_up',
    location: ['top'],

  },
  // Applications Section
  {
    id: 'applications',
    label: 'Applications',
    path: '/applications',
    icon: 'apps',
    location: ['top'],
  },

  // Projects with dynamic subroutes
  {
    id: 'projects',
    label: 'Projects',
    path: '/projects',
    icon: 'assignment',
    location: ['top'],
    children: [
      {
        id: 'project-list',
        label: 'All Projects',
        path: '/projects1',
        icon: 'list',
        location: ['side']
      },
      {
        id: 'project-details',
        label: 'Project Details',
        path: '/projects/:projectId',
        icon: 'info',
        location: ['side'],
        isDynamic: true,
        children: [
          {
            id: 'project-overview',
            label: 'Overview',
            path: '/projects/:projectId/overview',
            icon: 'dashboard',
            location: ['side'],
            parentParam: 'projectId'
          },
          {
            id: 'project-tasks',
            label: 'Tasks',
            path: '/projects/:projectId/tasks',
            icon: 'task',
            location: ['side'],
            parentParam: 'projectId'
          }
        ]
      }
    ]
  },
  {
    id: 'estimates',
    label: 'Estimates',
    path: '/estimates',
    icon: 'receipt_long',
    location: ['top'],
  },
  {
    id: 'documents',
    label: 'Documents',
    path: '/documents',
    icon: 'description',
    location: ['top'],
    children: [
      {
        id: 'doc-storage',
        label: 'Document Storage',
        path: '/documents/storage',
        icon: 'cloud_upload',
        location: ['top']
      },
      {
        id: 'doc-legacy',
        label: 'Legacy Documents',
        path: '/documents/legacy',
        icon: 'history',
        location: ['top']
      }
    ]
  },
  // Admin section with its own group
  {
    id: 'admin',
    path: '',
    label: 'Admin',
    icon: 'admin_panel_settings',
    location: ['top'],
    children: [
      {
        id: 'admin-user-management',
        label: 'User Management',
        path: '/admin/user-management',
        icon: 'people',
        location: ['top']
      },
      {
        id: 'admin-roles',
        label: 'Roles',
        path: '/admin/roles',
        icon: 'assignment_ind',
        location: ['top']
      },
      {
        id: 'admin-hosting',
        label: 'Hosting Resources',
        path: '/admin/hosting-resources',
        icon: 'cloud',
        location: ['top']
      },
      {
        id: 'admin-lookup',
        label: 'System Lookup Tables',
        path: '/admin/system-lookup-tables',
        icon: 'table_chart',
        location: ['top']
      },
      {
        id: 'admin-portfolio',
        label: 'Portfolio Management',
        path: '/admin/portfolio-management',
        icon: 'folder_special',
        location: ['top']
      }
    ]
  }

];
