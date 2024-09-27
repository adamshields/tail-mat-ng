import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';


import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideAnimationsAsync(),
    provideRouter(routes),

  ]
};
