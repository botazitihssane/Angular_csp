import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {HttpHandlerFn, HttpInterceptorFn, HttpRequest, provideHttpClient, withInterceptors} from "@angular/common/http";

const apiBaseUrlInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  return next(req);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([apiBaseUrlInterceptor])),]
};
