import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'user-management',
    loadComponent: () => import('./user-management/user-management.component').then(m => m.UserManagementComponent)
  },
  {
    path: 'roles',
    loadComponent: () => import('./roles/roles.component').then(m => m.RolesComponent)
  },
  // ... other admin routes
];
