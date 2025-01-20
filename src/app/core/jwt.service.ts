import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Service responsible for handling JSON Web Token (JWT) operations such as saving, retrieving,
 * and destroying tokens and user information in local storage.
 *
 * This service provides methods for managing the access token, refresh token, and user data,
 * enabling secure storage and retrieval of authentication-related information.
 */
@Injectable({
  providedIn: 'root'
})
export class JwtService {

  // Inject the Angular router service.
  private  router = inject(Router);

  /**
   * Retrieves the stored access token from local storage.
   *
   * @returns {string | null} The access token, or null if it does not exist.
   */
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /**
   * Saves the access token to local storage.
   *
   * @param {string} token - The access token to save.
   */
  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  /**
   * Removes the access token from local storage.
   */
  destroyToken(): void {
    localStorage.removeItem('access_token');
  }

  /**
   * Retrieves the stored refresh token from local storage.
   *
   * @returns {string | null} The refresh token, or null if it does not exist.
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  /**
   * Saves the refresh token to local storage.
   *
   * @param {string} token - The refresh token to save.
   */
  saveRefreshToken(token: string): void {
    localStorage.setItem('refresh_token', token);
  }

  /**
   * Removes the refresh token from local storage.
   */
  destroyRefreshToken(): void {
    localStorage.removeItem('refresh_token');
  }

  /**
   * Retrieves the stored user information from local storage.
   *
   * @returns {any} The user object, or null if it does not exist.
   */
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Saves the user information to local storage.
   *
   * @param {any} user - The user object to save.
   */
  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Removes the user information from local storage.
   */
  destroyUser(): void {
    localStorage.removeItem('user');
  }

  /**
   * Checks if the stored user is an administrator.
   *
   * @returns {boolean} True if the user is an administrator, otherwise false.
   */
  isAdmin(): boolean {
    const user = this.getUser();
    return user ? user.is_superuser : false;
  }

  /**
   * Logs out the user by clearing all tokens and user information from local storage.
   * Optionally redirects the user to the login page or a specified route.
   */
  logout(): void {
    this.destroyToken();
    this.destroyRefreshToken();
    this.destroyUser();
    this.router.navigate(['/login']); // Redirect to login or another appropriate route
  }
}


