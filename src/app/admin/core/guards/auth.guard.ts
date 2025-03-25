import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard  {

  constructor(private authService: AuthService,  private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (
      next.routeConfig !== undefined &&
      next.routeConfig?.path !== undefined
    ) {
      return this.checkAutenticated(next.routeConfig.path);
    }
    return false;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (route.path !== undefined) {
      return this.checkAutenticated(route.path);
    }
    return false;
  }

  checkAutenticated(path: string): boolean {
    const logged = this.authService.isLoggedIn();

    if (!logged) {
      this.authService.handleLoggin();
    }

    return logged;
  }
}