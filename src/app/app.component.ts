import {Component, OnInit, Injectable, OnDestroy} from '@angular/core';
import {ProductService} from './core/services/product.service';
import {SupabaseService} from './core/services/supabase.service';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Product} from './core/models/product.model';
import {AuthService} from './core/authentication/auth.service';
@Component({
  selector: 'app-root',
  // standalone: true,
  template: `
    <app-toolbar>
      <div class="flex row  gap-1  max-w-[400px]">
        <app-logout *ngIf="isAuthenticated" (click)="checkIfAuthenticated()" class=""></app-logout>

        <app-login *ngIf="!isAuthenticated" (click)="checkIfAuthenticated()" class=""></app-login>

        <button
          *ngIf="isAdminRoute"
          routerLink="/"
          class=" h-fit flex items-center bg-slate-100 dark:bg-slate-800 border border-gray-300 dark:border-black rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700"
        >
          <span class="h-[24px]">Home</span>
        </button>

        <button
          *ngIf="isOrdersRoute"
          routerLink="/"
          class=" h-fit flex items-center bg-slate-100 dark:bg-slate-800 border border-gray-300 dark:border-black rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700"
        >
          <span class="h-[24px]">Home</span>
        </button>

        <button
          *ngIf="!isOrdersRoute"
          class=" flex right-0  h-fit items-center bg-slate-100 dark:bg-slate-800 border border-gray-300 dark:border-black rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700  "
        >
          <span class="h-[24px]" [routerLink]="['/orders']">Pasūtījumi</span>
        </button>

        <button *ngIf="!isAdminRoute" routerLink="/admin" class="     ">
          <span class="">
            <img src="../../../assets/icons/manager.min.svg" [width]="64" [height]="64" alt="" />
          </span>
        </button>
      </div>
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
    private auth: AuthService,
  ) {}
  isAdminRoute: boolean = false;
  isOrdersRoute: boolean = false;
  isBaseHrefRoute: boolean = false;

  isManager: boolean = false;
  products: Product[] = [];
  isAuthenticated: boolean = false;
  testAccessToTableInput: string = '';
  result: any;
  user: any;
  userId: any;
  isAdminRouteSubscription: Subscription = new Subscription();
  isOrdersRouteSubscription: Subscription = new Subscription();
  isBaseHref: boolean = false;

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
  getIsOrdersRoute() {
    this.isOrdersRoute = this.router.url.includes('orders');
    this.isOrdersRouteSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isOrdersRoute = this.router.url.includes('orders');
      }
    });
  }
  getBaseHref() {
    this.isBaseHref = this.router.url.includes('/');
    console.log(this.isBaseHref);
    this.isOrdersRouteSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isBaseHrefRoute = this.router.url.includes('/');
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
    this.getIsOrdersRoute();
    this.getBaseHref();
  }
  ngOnDestroy() {
    this.isManager = false;
    this.isAuthenticated = false;
    this.isAdminRouteSubscription.unsubscribe();
  }
}
