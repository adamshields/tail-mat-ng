import { Routes } from '@angular/router';

export const DOCUMENTS_ROUTES: Routes = [
  {
    path: 'storage',
    loadComponent: () => import('./storage/storage.component').then(m => m.StorageComponent)
  },
  {
    path: 'legacy',
    loadComponent: () => import('./legacy/legacy.component').then(m => m.LegacyComponent)
  }
];
