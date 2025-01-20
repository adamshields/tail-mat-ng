import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from './jwt.service';

/**
 * Functional HTTP interceptor that adds a JWT token to HTTP requests if the token is available.
 *
 * This interceptor checks for a JWT token using the `JwtService` and appends it to the Authorization
 * header of outgoing HTTP requests.
 *
 * @relationship The `jwtInterceptor` function relies on the `JwtService` to retrieve
 * the current JWT token, which is then included in the HTTP request headers.
 *
 * @param {HttpRequest<any>} req - The outgoing HTTP request.
 * @param {HttpHandler} next - The next handler in the HTTP request chain.
 * @returns {Observable<HttpEvent<any>>} Observable of the HTTP event.
 */
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = inject(JwtService);
  const token = jwtService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
