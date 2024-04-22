import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { PulsoModule } from 'pulso-angular-components';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(
      PulsoModule.forRoot({
        toast: {
          duration: 5000,
          position: 'top',
        },
        token: 'plataformasaude',
      })
    ),
  ],
};
