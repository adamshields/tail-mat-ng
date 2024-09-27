import { Routes } from '@angular/router';
import { ApplicationsComponent } from './applications.component';

import { DesignsComponent } from './designs/designs.component';
import { DashboardComponent } from './designs/dashboard/dashboard.component';

export const APPLICATIONS_ROUTES: Routes = [
  {
    path: '',
    component: ApplicationsComponent
  },
  {
    path: 'designs',
    component: DesignsComponent,
    data: { showSidenav: true },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      }
    ]
  }
];
