import {Component, OnInit, Injectable, OnDestroy} from '@angular/core';
import {ProductService} from './core/services/product.service';
import {SupabaseService} from './core/services/supabase.service';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Product} from './core/models/product.model';
import { AuthService } from './core/authentication/auth.service';
@Component({
  selector: 'app-root',
  // standalone: true,
  template: `
    <app-toolbar>
      <button
        *ngIf="isAdminRoute"
        routerLink="/"
        class="absolute right-0 h-fit flex items-center bg-slate-100 dark:bg-slate-800 border border-gray-300 dark:border-black rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700"
      >
        <span class="h-[24px]">Home</span>
      </button>

      @if(isManager){

      <button
        *ngIf="!isAdminRoute"
        routerLink="/admin"
        class="absolute right-0  h-fit flex items-center bg-slate-100 dark:bg-slate-800 border border-gray-300 dark:border-black rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700  "
      >
        <span class="h-[24px]">Admin</span>
      </button>

      } @if(isAuthenticated){
      <!-- btn for my orders tailwind css -->
      <button
        class="absolute right-0  h-fit flex items-center bg-slate-100 dark:bg-slate-800 border border-gray-300 dark:border-black rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700  "
      >
        <span class="h-[24px]" [routerLink]="['/orders']">My Orders</span>
      </button>

      <app-logout (click)="checkIfAuthenticated()" class=""></app-logout>
      } @if(!isAuthenticated) {
      <app-login (click)="checkIfAuthenticated()" class=""></app-login>
      }
    </app-toolbar>
    <app-merch-header></app-merch-header>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private productService: ProductService,
    private db: SupabaseService,
    private router: Router,
    private auth: AuthService
    ,
  ) {}
  isAdminRoute: boolean = false;
  isManager: boolean = false;
  products: Product[] = [];
  isAuthenticated: boolean = false;
  testAccessToTableInput: string = '';
  result: any;
  user: any;
  userId: any;
  isAdminRouteSubscription: Subscription = new Subscription();

  login() {
    this.db.authWithDiscord();
  }
  getIsAdminRoute() {
    this.isAdminRoute = this.router.url.includes('admin');
    this.isAdminRouteSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAdminRoute = this.router.url.includes('admin');
      }
    });
  }

  async checkIfAuthenticated() {
    const {data, error} = await this.db.supabase.auth.getSession();
    if (error) {
      console.log(`error getting session:`, error);
      return false;
    }
    if (data.session?.user.aud == 'authenticated') {
      this.isAuthenticated = true;

      return true;
    } else {
      this.isAuthenticated = false;
      this.isManager = false;
      return false;
    }
  }

  async ngOnInit() {
    this.auth.isManager$.subscribe((data) => {
      this.isManager = data;
    });
    this.isAuthenticated = await this.checkIfAuthenticated();
    this.getIsAdminRoute();
  }
  ngOnDestroy() {
    this.isManager = false;
    this.isAuthenticated = false;
    this.isAdminRouteSubscription.unsubscribe();
  }
}
