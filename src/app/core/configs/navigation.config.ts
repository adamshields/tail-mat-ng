import { NavItem } from "../models/navigation.types";

export const SITE_NAVIGATION: NavItem[] = [
  // Portfolio section
  {
    id: 'portfolios',
    label: 'Portfolios',
    path: '/portfolios',
    icon: 'folder_open',
    location: ['top'],
  },
  // Test section with side navigation items and children
  {
    id: 'test',
    label: 'Test',
    path: '/test',
    icon: 'trending_up',
    location: ['top'],
    children: [
      {
        id: 'test-overview',
        label: 'Test Overview',
        path: '/test/overview',
        icon: 'dashboard',
        location: ['side'],
        children: [
          {
            id: 'test-overview-summary',
            label: 'Summary',
            path: '/test/overview/summary',
            icon: 'summarize',
            location: ['side']
          },
          {
            id: 'test-overview-details',
            label: 'Details',
            path: '/test/overview/details',
            icon: 'details',
            location: ['side']
          }
        ]
      },
      {
        id: 'test-results',
        label: 'Test Results',
        path: '/test/results',
        icon: 'bar_chart',
        location: ['side'],
        children: [
          {
            id: 'test-results-current',
            label: 'Current Results',
            path: '/test/results/current',
            icon: 'insights',
            location: ['side']
          },
          {
            id: 'test-results-history',
            label: 'Results History',
            path: '/test/results/history',
            icon: 'history',
            location: ['side']
          }
        ]
      },
      {
        id: 'test-settings',
        label: 'Test Settings',
        path: '/test/settings',
        icon: 'settings',
        location: ['side']
      },
      {
        id: 'test-reports',
        label: 'Test Reports',
        path: '/test/reports',
        icon: 'assessment',
        location: ['side'],
        children: [
          {
            id: 'test-reports-monthly',
            label: 'Monthly Reports',
            path: '/test/reports/monthly',
            icon: 'date_range',
            location: ['side']
          },
          {
            id: 'test-reports-annual',
            label: 'Annual Reports',
            path: '/test/reports/annual',
            icon: 'event',
            location: ['side']
          }
        ]
      },
      {
        id: 'test-history',
        label: 'Test History',
        path: '/test/history',
        icon: 'history',
        location: ['side'],
        children: [
          {
            id: 'test-history-recent',
            label: 'Recent History',
            path: '/test/history/recent',
            icon: 'update',
            location: ['side']
          },
          {
            id: 'test-history-archived',
            label: 'Archived History',
            path: '/test/history/archived',
            icon: 'archive',
            location: ['side']
          }
        ]
      }
    ]
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
  // Estimates
  {
    id: 'estimates',
    label: 'Estimates',
    path: '/estimates',
    icon: 'receipt_long',
    location: ['top'],
  },
  // Documents section with sub-items
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
  // Admin section with sub-items
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
