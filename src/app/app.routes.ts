import { Routes } from '@angular/router';
import { MainAppLayoutComponent } from './_layouts/main-app-layout/main-app-layout.component';
import { LayoutComponent } from '../@breaker/layout/layout.component';
import { LAB_ROUTES } from '../@breaker/lab/lab.routes';
import { GenericPageComponent } from '../@breaker/components/generic-page/generic-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainAppLayoutComponent,
    children: [

      {
        path: '',
        loadComponent: () => import('./_pages/home/home.component').then(m => m.HomeComponent),
        // data: { showSidenav: true }
      },
      {
        path: 'lab',
        loadChildren: () => import('../@breaker/lab/lab.routes').then(m => m.LAB_ROUTES),
        // data: { showSidenav: false }
      },
      {
        path: 'test',
        children: [
          {
            path: '**',
            component: GenericPageComponent
          }
        ]
      },
      {
        path: 'portfolios',
        loadComponent: () => import('./_pages/portfolios/portfolios.component').then(m => m.PortfoliosComponent),
        // data: { showSidenav: false }
      },
      {
        path: 'applications',
        loadChildren: () => import('./_pages/applications/applications.routes').then(m => m.APPLICATIONS_ROUTES),
        // data: { showSidenav: false }
      },
      {
        path: 'projects',
        loadComponent: () => import('./_pages/projects/projects.component').then(m => m.ProjectsComponent),
        // data: { showSidenav: false }
      },
      {
        path: 'estimates',
        loadComponent: () => import('./_pages/estimates/estimates.component').then(m => m.EstimatesComponent),
        // data: { showSidenav: false }
      },
      {
        path: 'documents/storage',
        loadComponent: () => import('./_pages/documents/storage/storage.component').then(m => m.StorageComponent),
        // data: { showSidenav: false }
      },
      {
        path: 'documents/legacy',
        loadComponent: () => import('./_pages/documents/legacy/legacy.component').then(m => m.LegacyComponent),
        // data: { showSidenav: false }
      },
      {
        path: 'admin/user-management',
        loadComponent: () => import('./_pages/admin/user-management/user-management.component').then(m => m.UserManagementComponent),
        // data: { showSidenav: true }
      },
      {
        path: 'admin/roles',
        loadComponent: () => import('./_pages/admin/roles/roles.component').then(m => m.RolesComponent),
        // data: { showSidenav: true }
      }
    ]
  },
  {
    path: 'v2',
    component: LayoutComponent,
    children: [

      {
        path: '',
        loadComponent: () => import('./_pages/home/home.component').then(m => m.HomeComponent),
        // data: { showSidenav: false }
      },
      {
        path: 'test',
        loadComponent: () => import('./_pages/test/test.component').then(m => m.TestComponent),
        // data: { showSidenav: false }
      },
      {
        path: 'portfolios',
        loadComponent: () => import('./_pages/portfolios/portfolios.component').then(m => m.PortfoliosComponent),
        // data: { showSidenav: false }
      },
      {
        path: 'applications',
        loadChildren: () => import('./_pages/applications/applications.routes').then(m => m.APPLICATIONS_ROUTES),
        // data: { showSidenav: false }
      },
      {
        path: 'projects',
        loadComponent: () => import('./_pages/projects/projects.component').then(m => m.ProjectsComponent),
        // data: { showSidenav: false }
      },
      {
        path: 'estimates',
        loadComponent: () => import('./_pages/estimates/estimates.component').then(m => m.EstimatesComponent),
        // data: { showSidenav: false }
      },
      {
        path: 'documents/storage',
        loadComponent: () => import('./_pages/documents/storage/storage.component').then(m => m.StorageComponent),
        // data: { showSidenav: false }
      },
      {
        path: 'documents/legacy',
        loadComponent: () => import('./_pages/documents/legacy/legacy.component').then(m => m.LegacyComponent),
        // data: { showSidenav: false }
      },
      {
        path: 'admin/user-management',
        loadComponent: () => import('./_pages/admin/user-management/user-management.component').then(m => m.UserManagementComponent),
        // data: { showSidenav: true }
      },
      {
        path: 'admin/roles',
        loadComponent: () => import('./_pages/admin/roles/roles.component').then(m => m.RolesComponent),
        // data: { showSidenav: true }
      }
    ]
  }
];

  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   // data: { layout: 'default' as LayoutType }
  // },
  // {
  //   path: 'color',
  //   component: ColorPaletteComponent,
  //   // data: { layout: 'default' as LayoutType }
  // },
  // {
  //   path: 'applications',
  //   component: ApplicationsComponent,
  //   // data: { layout: 'default' as LayoutType }
  // },
  // {
  //   path: 'applications/designs',
  //   component: DesignsComponent,
  //   data: { layout: 'sidenav' as LayoutType }
  // }
// ];
// export const routes: Routes = [
//   {
//     path: '',
//     component: MainAppLayoutComponent,
//     children: [
//       { path: '', pathMatch: 'full', redirectTo: 'portfolios' },
//       {
//         path: 'portfolios',
//         loadComponent: () => import('./_pages/portfolios/portfolios.component').then(m => m.PortfoliosComponent)
//       },
//       {
//         path: 'applications',
//         loadChildren: () => import('./_pages/applications/applications.routes').then(m => m.APPLICATIONS_ROUTES)
//       },
//       {
//         path: 'projects',
//         loadComponent: () => import('./_pages/projects/projects.component').then(m => m.ProjectsComponent)
//       },
//       {
//         path: 'estimates',
//         loadComponent: () => import('./_pages/estimates/estimates.component').then(m => m.EstimatesComponent)
//       },
//       {
//         path: 'documents',
//         loadChildren: () => import('./_pages/documents/documents.routes').then(m => m.DOCUMENTS_ROUTES)
//       },
//       {
//         path: 'admin',
//         loadChildren: () => import('./_pages/admin/admin.routes').then(m => m.ADMIN_ROUTES)
//       }
//     ]
//   },
//   // You can add routes outside of MainAppLayoutComponent here if needed
//   // For example, a full-screen login page or error pages
// ];
