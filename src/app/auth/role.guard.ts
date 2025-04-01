import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root', 
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private jwtHelper: JwtHelperService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('RoleGuard activated');
    const token = localStorage.getItem('access_token');
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/auth/signin']);
      return false;
    }
    const decodedToken: any = this.jwtHelper.decodeToken(token);
    const allowedRoles = route.data['roles'];
    if (!allowedRoles) {
      return true;
    }

    if (allowedRoles.includes(decodedToken.role)) {
      return true;
    }
    this.router.navigate(['/forbidden']);
    return false;
  }
}
