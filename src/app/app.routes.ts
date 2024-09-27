import { Routes } from '@angular/router';
import { MainAppLayoutComponent } from './_layouts/main-app-layout/main-app-layout.component';
import { HomeComponent } from './_pages/home/home.component';
import { ApplicationsComponent } from './_pages/applications/applications.component';
import { DesignsComponent } from './_pages/applications/designs/designs.component';
import { LayoutType } from '../layout.service';
import { ColorPaletteComponent } from './_pages/color-palette/color-palette.component';
import { PortfoliosComponent } from './_pages/portfolios/portfolios.component';
import { ProjectsComponent } from './_pages/projects/projects.component';
import { EstimatesComponent } from './_pages/estimates/estimates.component';
import { StorageComponent } from './_pages/documents/storage/storage.component';
import { LegacyComponent } from './_pages/documents/legacy/legacy.component';
import { UserManagementComponent } from './_pages/admin/user-management/user-management.component';
import { RolesComponent } from './_pages/admin/roles/roles.component';

export const routes: Routes = [
  {
    path: '',
    component: MainAppLayoutComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'portfolios', component: PortfoliosComponent},
      {path: 'applications', component: ApplicationsComponent},
      {path: 'projects', component: ProjectsComponent},
      {path: 'estimates', component: EstimatesComponent},
      {path: 'documents/storage', component: StorageComponent},
      {path: 'documents/legacy', component: LegacyComponent},
      {path: 'admin/user-management', component: UserManagementComponent},
      {path: 'admin/roles', component: RolesComponent},
    ]
  },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   // data: { layout: 'default' as LayoutType }
  // },
  {
    path: 'color',
    component: ColorPaletteComponent,
    // data: { layout: 'default' as LayoutType }
  },
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
];
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
