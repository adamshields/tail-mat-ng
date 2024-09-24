import { Routes } from '@angular/router';
import { MainAppLayoutComponent } from './_layouts/main-app-layout/main-app-layout.component';
import { HomeComponent } from './_pages/home/home.component';
import { ApplicationsComponent } from './_pages/applications/applications.component';
import { DesignsComponent } from './_pages/applications/designs/designs.component';
import { LayoutType } from '../layout.service';
import { ColorPaletteComponent } from './_pages/color-palette/color-palette.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { layout: 'default' as LayoutType }
  },
  {
    path: 'color',
    component: ColorPaletteComponent,
    data: { layout: 'default' as LayoutType }
  },
  {
    path: 'applications',
    component: ApplicationsComponent,
    data: { layout: 'default' as LayoutType }
  },
  {
    path: 'applications/designs',
    component: DesignsComponent,
    data: { layout: 'sidenav' as LayoutType }
  }
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
