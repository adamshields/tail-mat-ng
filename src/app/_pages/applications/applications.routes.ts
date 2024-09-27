import { Routes } from '@angular/router';
import { ApplicationsComponent } from './applications.component';

import { DesignsComponent } from './designs/designs.component';

export const APPLICATIONS_ROUTES: Routes = [
  {
    path: '',
    component: ApplicationsComponent
  },
  {
    path: 'designs',

    children: [
      {
        path: '',
        component: DesignsComponent
      }
      // You can add more child routes here if needed
    ]
  }
];
