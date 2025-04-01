import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { RoleGuard } from './app/auth/role.guard';
import { provideRouter } from '@angular/router';
import { AuthInterceptor } from './app/auth/auth.interceptor';
import { routes } from './app/app-routing.module';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => localStorage.getItem('access_token'), 
    allowedDomains: ['your-api-domain.com'],
    disallowedRoutes: ['your-api-domain.com/auth/signin'], 
  };
}
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    
    importProvidersFrom(BrowserModule, AppRoutingModule,HttpClientModule),
    provideAnimations(), 
    provideAnimationsAsync(),  
    provideHttpClient(withInterceptors([AuthInterceptor])), 
    provideRouter(routes), 
    JwtHelperService, 
    RoleGuard,
    {
      provide: JWT_OPTIONS, 
      useFactory: jwtOptionsFactory, 
    },
]
}).catch((err) => console.error(err));
