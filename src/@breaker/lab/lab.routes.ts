// src/@breaker/lab/lab.routes.ts
import { Routes } from '@angular/router';

export const LAB_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signals',
        loadComponent: () =>
          import('./pages/signal-testing/signal-testing.component')
            .then(m => m.SignalTestingComponent)
      },
      {
        path: 'rxjs',
        loadComponent: () =>
          import('./pages/rxjs-playground/rxjs-playground.component')
            .then(m => m.RxjsPlaygroundComponent)
      },
      {
        path: 'parent-child',
        loadComponent: () =>
          import('./pages/parent-child/parent-child.component')
            .then(m => m.ParentChildComponent)
      }
    ]
  }
];
