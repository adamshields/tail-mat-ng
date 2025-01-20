import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';

/**
 * Guard that checks if the user is authenticated by verifying the presence of a JWT token.
 *
 * @returns {boolean} True if the user is authenticated, otherwise redirects to the login page and returns false.
 *
 * @relationship This guard relies on the `JwtService` to check for the presence of an authentication token.
 */
export const authGuard = () => {
  const router = inject(Router);
  const jwtService = inject(JwtService);

  if (jwtService.getToken()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

/**
 * Guard that checks if the user is both authenticated and an administrator.
 *
 * @returns {boolean} True if the user is an admin, otherwise redirects to the main app page and returns false.
 *
 * @relationship This guard uses the `JwtService` to verify both the presence of a token and the user's admin status.
 */
export const adminGuard = () => {
  const router = inject(Router);
  const jwtService = inject(JwtService);

  if (jwtService.getToken() && jwtService.isAdmin()) {
    return true;
  } else {
    router.navigate(['/app']); // Redirect non-admins to the main app
    return false;
  }
};
