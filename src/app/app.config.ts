import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideHttpClient } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { routes } from './app.routes';

import { GLOBAL_APP_CONFIG } from './core/configs/global-settings.config';

// Create an InjectionToken for the configuration
export const APP_CONFIG_TOKEN = new InjectionToken<typeof GLOBAL_APP_CONFIG>('app.config');

export const appConfig: ApplicationConfig = {
  providers: [
    provideAngularSvgIcon(),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', subscriptSizing: 'dynamic' },
    },
    // Provide APP_CONFIG globally
    {
      provide: APP_CONFIG_TOKEN,
      useValue: GLOBAL_APP_CONFIG,
    },
  ],
};
