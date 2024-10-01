import { Routes } from '@angular/router';
import { ApplicationsComponent } from './applications.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { DesignDetailsComponent } from './design-details/design-details.component';

export const APPLICATIONS_ROUTES: Routes = [
  {
    path: '',
    component: ApplicationsComponent,
    data: { showSidenav: false }  // Explicitly set sidenav visibility
  },
  {
    path: ':id',
    component: ApplicationDetailsComponent,
    data: { showSidenav: false }  // Explicitly set sidenav visibility
  },
  {
    path: ':id/designs/:designId',
    component: DesignDetailsComponent,
    data: { showSidenav: true }
  }
];
