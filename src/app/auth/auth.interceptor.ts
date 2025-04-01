import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router); 
  const token = localStorage.getItem('access_token');
  const clonedRequest = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(clonedRequest).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        console.error('401 Unauthorized - Redirecting to Sign In');
        localStorage.removeItem('access_token'); 
        router.navigate(['auth/signin']); 
      }
      return throwError(() => error);
    })
  );
  
};
