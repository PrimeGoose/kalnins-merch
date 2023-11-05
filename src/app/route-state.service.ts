// route-state.service.ts

import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouteStateService {
  public canNavigateToSuccess: boolean = false;

  allowNavigationToSuccess(): void {
    this.canNavigateToSuccess = true;
  }

  disallowNavigationToSuccess(): void {
    this.canNavigateToSuccess = false;
  }
}
