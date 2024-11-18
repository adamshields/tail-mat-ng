import { NavItem } from "../models/navigation.types";

export const SITE_NAVIGATION: NavItem[] = [
  {
    id: 'portfolios',
    label: 'Portfolios',
    path: '/portfolios',
    icon: 'folder_open',
    displayType: ['horizontal'],
  },
  {
    id: 'applications',
    label: 'Applications',
    path: '/applications',
    icon: 'apps',
    displayType: ['horizontal'],
    children: [
      {
        id: 'design-menu',
        label: 'Design Navigation',
        path: '/applications/:appId/designs/:designId',
        icon: 'design_services',
        displayType: ['vertical'],
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
    id: 'documents',
    label: 'Documents',
    path: '/documents',
    icon: 'description',
    displayType: ['horizontal'],
    children: [
      {
        id: 'doc-storage',
        label: 'Document Storage',
        path: '/documents/storage',
        icon: 'cloud_upload',
        displayType: ['horizontal']
      },
      {
        id: 'doc-legacy',
        label: 'Legacy Documents',
        path: '/documents/legacy',
        icon: 'history',
        displayType: ['horizontal']
      }
    ]
  },
  {
    id: 'admin',
    path: '/admin',
    label: 'Admin',
    icon: 'admin_panel_settings',
    displayType: ['horizontal'],
    children: [
      {
        id: 'admin-user-management',
        label: 'User Management',
        path: '/admin/user-management',
        icon: 'people',
        displayType: ['horizontal']
      },
      {
        id: 'admin-roles',
        label: 'Roles',
        path: '/admin/roles',
        icon: 'assignment_ind',
        displayType: ['horizontal']
      },
      {
        id: 'admin-hosting',
        label: 'Hosting Resources',
        path: '/admin/hosting-resources',
        icon: 'cloud',
        displayType: ['horizontal']
      },
      {
        id: 'admin-lookup',
        label: 'System Lookup Tables',
        path: '/admin/system-lookup-tables',
        icon: 'table_chart',
        displayType: ['horizontal']
      },
      {
        id: 'admin-portfolio',
        label: 'Portfolio Management',
        path: '/admin/portfolio-management',
        icon: 'folder_special',
        displayType: ['horizontal']
      }
    ]
  },
  {
    id: 'lab',
    label: 'Lab',
    path: '/lab',
    icon: 'science',
    displayType: ['horizontal'],
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
  },
  {
    id: 'test',
    label: 'Test',
    path: '/test',
    icon: 'trending_up',
    displayType: ['horizontal'],
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
      }
    ]
  },
 ];
