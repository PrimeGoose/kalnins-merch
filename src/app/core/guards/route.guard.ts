// route.guard.ts

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {RouteStateService} from '../../route-state.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuard implements CanActivate {
  constructor(
    private routeStateService: RouteStateService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.routeStateService.canNavigateToSuccess) {
      this.routeStateService.disallowNavigationToSuccess(); // reset the state
      return true;
    } else {
      this.router.navigate(['/']); // redirect to the home page
      return false;
    }
  }
}
