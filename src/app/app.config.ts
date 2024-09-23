import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';


import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { LayoutRoutingStrategy } from './layout-routing-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideAnimationsAsync(),
    provideRouter(routes),
    {
      provide: TitleStrategy,
      useClass: LayoutRoutingStrategy
    }, provideAnimationsAsync()
  ]
};
