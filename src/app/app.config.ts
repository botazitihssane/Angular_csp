import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {HttpHandlerFn, HttpInterceptorFn, HttpRequest, provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideQueryClient, QueryClient} from "@tanstack/angular-query-experimental";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});


const apiBaseUrlInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  return next(req);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideQueryClient(queryClient),
    provideHttpClient(withInterceptors([apiBaseUrlInterceptor])),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([apiBaseUrlInterceptor])),]
};
