import { NavItem } from "../models/navigation.types";

export const SITE_NAVIGATION: NavItem[] = [
  // navigation.config.ts - Add this to your SITE_NAVIGATION array
// navigation.config.ts - Add this to your SITE_NAVIGATION array
{
  id: 'lab',
  label: 'Lab',
  path: '/lab',
  icon: 'science',
  location: ['top'],
  children: [
    {
      id: 'lab-signals',
      label: 'Signal Testing',
      path: '/lab/signals',
      icon: 'bolt',
      location: ['side']
    },
    {
      id: 'lab-rxjs',
      label: 'RxJS Playground',
      path: '/lab/rxjs',
      icon: 'transform',
      location: ['side']
    },
    {
      id: 'lab-parent-child',
      label: 'Parent Child',
      path: '/lab/parent-child',
      icon: 'account_tree',
      location: ['side']
    },
    {
      id: 'lab-forms',
      label: 'Form Testing',
      path: '/lab/forms',
      icon: 'dynamic_form',
      location: ['side']
    }
  ]
},
  // Portfolio section
  {
    id: 'portfolios',
    label: 'Portfolios',
    path: '/portfolios',
    icon: 'folder_open',
    location: ['top'],
  },
  // Test section with extensive side navigation items and multiple levels of children
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
        children: Array.from({ length: 10 }, (_, i) => ({
          id: `test-overview-summary-${i + 1}`,
          label: `Summary ${i + 1}`,
          path: `/test/overview/summary-${i + 1}`,
          icon: 'summarize',
          location: ['side'],
          children: Array.from({ length: 5 }, (_, j) => ({
            id: `test-overview-summary-detail-${i + 1}-${j + 1}`,
            label: `Detail ${j + 1}`,
            path: `/test/overview/summary-${i + 1}/detail-${j + 1}`,
            icon: 'details',
            location: ['side']
          }))
        }))
      },
      {
        id: 'test-results',
        label: 'Test Results',
        path: '/test/results',
        icon: 'bar_chart',
        location: ['side'],
        children: Array.from({ length: 8 }, (_, i) => ({
          id: `test-results-category-${i + 1}`,
          label: `Results Category ${i + 1}`,
          path: `/test/results/category-${i + 1}`,
          icon: 'category',
          location: ['side'],
          children: Array.from({ length: 6 }, (_, j) => ({
            id: `test-results-category-item-${i + 1}-${j + 1}`,
            label: `Item ${j + 1}`,
            path: `/test/results/category-${i + 1}/item-${j + 1}`,
            icon: 'bar_chart',
            location: ['side']
          }))
        }))
      },
      {
        id: 'test-settings',
        label: 'Test Settings',
        path: '/test/settings',
        icon: 'settings',
        location: ['side'],
        children: Array.from({ length: 10 }, (_, i) => ({
          id: `test-settings-option-${i + 1}`,
          label: `Settings Option ${i + 1}`,
          path: `/test/settings/option-${i + 1}`,
          icon: 'tune',
          location: ['side'],
          children: Array.from({ length: 4 }, (_, j) => ({
            id: `test-settings-option-detail-${i + 1}-${j + 1}`,
            label: `Detail ${j + 1}`,
            path: `/test/settings/option-${i + 1}/detail-${j + 1}`,
            icon: 'details',
            location: ['side']
          }))
        }))
      },
      {
        id: 'test-reports',
        label: 'Test Reports',
        path: '/test/reports',
        icon: 'assessment',
        location: ['side'],
        children: Array.from({ length: 15 }, (_, i) => ({
          id: `test-reports-section-${i + 1}`,
          label: `Reports Section ${i + 1}`,
          path: `/test/reports/section-${i + 1}`,
          icon: 'insert_drive_file',
          location: ['side'],
          children: Array.from({ length: 3 }, (_, j) => ({
            id: `test-reports-section-item-${i + 1}-${j + 1}`,
            label: `Report Item ${j + 1}`,
            path: `/test/reports/section-${i + 1}/item-${j + 1}`,
            icon: 'insert_chart',
            location: ['side']
          }))
        }))
      },
      {
        id: 'test-history',
        label: 'Test History',
        path: '/test/history',
        icon: 'history',
        location: ['side'],
        children: Array.from({ length: 12 }, (_, i) => ({
          id: `test-history-period-${i + 1}`,
          label: `History Period ${i + 1}`,
          path: `/test/history/period-${i + 1}`,
          icon: 'timeline',
          location: ['side'],
          children: Array.from({ length: 5 }, (_, j) => ({
            id: `test-history-period-entry-${i + 1}-${j + 1}`,
            label: `Entry ${j + 1}`,
            path: `/test/history/period-${i + 1}/entry-${j + 1}`,
            icon: 'view_list',
            location: ['side']
          }))
        }))
      }
    ]
  },
  // Applications Section with Designs
  {
    id: 'applications',
    label: 'Applications',
    path: '/applications',
    icon: 'apps',
    location: ['top'],
    children: [
      {
        id: 'design-menu',
        label: 'Design Navigation',
        path: '/applications/:appId/designs/:designId',
        icon: 'design_services',
        location: ['side'],
        children: [
          {
            id: 'design-overview',
            label: 'Design Overview',
            path: '/applications/:appId/designs/:designId/overview',
            icon: 'dashboard',
            location: ['side']
          },
          {
            id: 'design-components',
            label: 'Components',
            path: '/applications/:appId/designs/:designId/components',
            icon: 'widgets',
            location: ['side']
          },
          {
            id: 'design-settings',
            label: 'Settings',
            path: '/applications/:appId/designs/:designId/settings',
            icon: 'settings',
            location: ['side']
          }
        ]
      }
    ]
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
        location: ['side', 'top']
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
        location: ['top'],

      }
    ]
  }
];
