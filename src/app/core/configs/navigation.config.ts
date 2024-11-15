import { NavItem } from "../models/navigation.types";

export const SITE_NAVIGATION: NavItem[] = [
  {
    id: 'portfolios',
    label: 'Portfolios',
    path: '/portfolios',
    icon: 'folder_open',
    displayType: ['horizontal'],
    order: 1
  },
  {
    id: 'test',
    label: 'Test',
    path: '/test',
    icon: 'trending_up',
    displayType: ['horizontal'],
    order: 2,
    children: [
      {
        id: 'test-overview',
        label: 'Test Overview',
        path: '/test/overview',
        icon: 'dashboard',
        displayType: ['vertical'],
        children: Array.from({ length: 10 }, (_, i) => ({
          id: `test-overview-summary-${i + 1}`,
          label: `Summary ${i + 1}`,
          path: `/test/overview/summary-${i + 1}`,
          icon: 'summarize',
          displayType: ['vertical'],
          children: Array.from({ length: 5 }, (_, j) => ({
            id: `test-overview-summary-detail-${i + 1}-${j + 1}`,
            label: `Detail ${j + 1}`,
            path: `/test/overview/summary-${i + 1}/detail-${j + 1}`,
            icon: 'details',
            displayType: ['vertical']
          }))
        }))
      },
      {
        id: 'test-results',
        label: 'Test Results',
        path: '/test/results',
        icon: 'bar_chart',
        displayType: ['vertical'],
        children: Array.from({ length: 8 }, (_, i) => ({
          id: `test-results-category-${i + 1}`,
          label: `Results Category ${i + 1}`,
          path: `/test/results/category-${i + 1}`,
          icon: 'category',
          displayType: ['vertical'],
          children: Array.from({ length: 6 }, (_, j) => ({
            id: `test-results-category-item-${i + 1}-${j + 1}`,
            label: `Item ${j + 1}`,
            path: `/test/results/category-${i + 1}/item-${j + 1}`,
            icon: 'bar_chart',
            displayType: ['vertical']
          }))
        }))
      },
      {
        id: 'test-settings',
        label: 'Test Settings',
        path: '/test/settings',
        icon: 'settings',
        displayType: ['vertical'],
        children: Array.from({ length: 10 }, (_, i) => ({
          id: `test-settings-option-${i + 1}`,
          label: `Settings Option ${i + 1}`,
          path: `/test/settings/option-${i + 1}`,
          icon: 'tune',
          displayType: ['vertical'],
          children: Array.from({ length: 4 }, (_, j) => ({
            id: `test-settings-option-detail-${i + 1}-${j + 1}`,
            label: `Detail ${j + 1}`,
            path: `/test/settings/option-${i + 1}/detail-${j + 1}`,
            icon: 'details',
            displayType: ['vertical']
          }))
        }))
      }
    ]
  },
  {
    id: 'applications',
    label: 'Applications',
    path: '/applications',
    icon: 'apps',
    displayType: ['horizontal'],
    order: 0,
    children: [
      {
        id: 'design-menu',
        label: 'Design Navigation',
        path: '/applications/:appId/designs/:designId',
        icon: 'design_services',
        displayType: ['vertical'],
        isDynamic: true,
        children: [
          {
            id: 'design-overview',
            label: 'Design Overview',
            path: '/applications/:appId/designs/:designId/overview',
            icon: 'dashboard',
            displayType: ['vertical']
          },
          {
            id: 'design-components',
            label: 'Components',
            path: '/applications/:appId/designs/:designId/components',
            icon: 'widgets',
            displayType: ['vertical']
          },
          {
            id: 'design-settings',
            label: 'Settings',
            path: '/applications/:appId/designs/:designId/settings',
            icon: 'settings',
            displayType: ['vertical']
          }
        ]
      }
    ]
  },
  {
    id: 'projects',
    label: 'Projects',
    path: '/projects',
    icon: 'assignment',
    displayType: ['horizontal'],
    order: 4,
    children: [
      {
        id: 'project-list',
        label: 'All Projects',
        path: '/projects1',
        icon: 'list',
        displayType: ['vertical']
      },
      {
        id: 'project-details',
        label: 'Project Details',
        path: '/projects/:projectId',
        icon: 'info',
        displayType: ['vertical'],
        isDynamic: true,
        children: [
          {
            id: 'project-overview',
            label: 'Overview',
            path: '/projects/:projectId/overview',
            icon: 'dashboard',
            displayType: ['vertical']
          },
          {
            id: 'project-tasks',
            label: 'Tasks',
            path: '/projects/:projectId/tasks',
            icon: 'task',
            displayType: ['vertical']
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
    displayType: ['horizontal'],
    order: 5
  },
  {
    id: 'documents',
    label: 'Documents',
    path: '/documents',
    icon: 'description',
    displayType: ['horizontal'],
    order: 6,
    children: [
      {
        id: 'doc-storage',
        label: 'Document Storage',
        path: '/documents/storage',
        icon: 'cloud_upload',
        displayType: ['dropdown']
      },
      {
        id: 'doc-legacy',
        label: 'Legacy Documents',
        path: '/documents/legacy',
        icon: 'history',
        displayType: ['dropdown']
      }
    ]
  },
  {
    id: 'admin',
    path: '',
    label: 'Admin',
    icon: 'admin_panel_settings',
    displayType: ['horizontal'],
    order: 7,
    visibility: {
      roles: ['admin']
    },
    children: [
      {
        id: 'admin-user-management',
        label: 'User Management',
        path: '/admin/user-management',
        icon: 'people',
        displayType: ['dropdown', 'vertical']
      },
      {
        id: 'admin-roles',
        label: 'Roles',
        path: '/admin/roles',
        icon: 'assignment_ind',
        displayType: ['dropdown']
      },
      {
        id: 'admin-hosting',
        label: 'Hosting Resources',
        path: '/admin/hosting-resources',
        icon: 'cloud',
        displayType: ['dropdown']
      },
      {
        id: 'admin-lookup',
        label: 'System Lookup Tables',
        path: '/admin/system-lookup-tables',
        icon: 'table_chart',
        displayType: ['dropdown']
      },
      {
        id: 'admin-portfolio',
        label: 'Portfolio Management',
        path: '/admin/portfolio-management',
        icon: 'folder_special',
        displayType: ['dropdown']
      }
    ]
  },
  {
    id: 'lab',
    label: 'Lab',
    path: '/lab',
    icon: 'science',
    displayType: ['horizontal'],
    order: 8,
    children: [
      {
        id: 'lab-signals',
        label: 'Signal Testing',
        path: '/lab/signals',
        icon: 'bolt',
        displayType: ['vertical']
      },
      {
        id: 'lab-ticker',
        label: 'Ticker',
        path: '/lab/ticker',
        icon: 'clock',
        displayType: ['vertical']
      },
      {
        id: 'lab-rxjs',
        label: 'RxJS Playground',
        path: '/lab/rxjs',
        icon: 'transform',
        displayType: ['vertical']
      },
      {
        id: 'lab-parent-child',
        label: 'Parent Child',
        path: '/lab/parent-child',
        icon: 'account_tree',
        displayType: ['vertical']
      },
      {
        id: 'lab-forms',
        label: 'Form Testing',
        path: '/lab/forms',
        icon: 'dynamic_form',
        displayType: ['vertical']
      }
    ]
  }
 ];
