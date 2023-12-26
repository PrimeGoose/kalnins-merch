import {Component, OnInit, Injectable, OnDestroy} from '@angular/core';
import {Product, ProductService} from './core/services/product.service';
import {SupabaseService} from './core/services/supabase.service';
import {NavigationEnd, Router} from '@angular/router';

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
      <button
        *ngIf="!isAdminRoute"
        routerLink="/admin"
        class="absolute right-0  h-fit flex items-center bg-slate-100 dark:bg-slate-800 border border-gray-300 dark:border-black rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700  "
      >
        <span class="h-[24px]">Admin</span>
      </button>

      @if(isAuthenticated){

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
export class AppComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private supabase: SupabaseService,
    private router: Router,
  ) {}
  isAdminRoute: boolean = false;
  isManager: boolean = false;
  products: Product[] = [];
  isAuthenticated: boolean = false;
  testAccessToTableInput: string = '';
  result: any;
  user: any;
  userId: any;
  isAdminRouteSubscription: any;

  login() {
    this.supabase.authWithDiscord();
  }
  getIsAdminRoute() {
    this.isAdminRoute = this.router.url.includes('admin');
    this.isAdminRouteSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAdminRoute = this.router.url.includes('admin');
      }
    });
  }

  testAccessToTable(table: string) {
    this.supabase.testAccessToTable(table).then((result) => {
      this.result = result;
    });
  }

  async checkIfAuthenticated() {
    const {data, error} = await this.supabase.supabase.auth.getSession();
    if (error) {
      console.log('error', error);
      return false;
    }
    console.log('data', data.session?.user.aud);
    if (data.session?.user.aud == 'authenticated') {
      this.isAuthenticated = true;
      return true;
    } else {
      this.isAuthenticated = false;
      return false;
    }
  }

  async ngOnInit() {
    this.isManager = await this.supabase.getIsStoreManager();
    this.isAuthenticated = await this.checkIfAuthenticated();
    this.getIsAdminRoute();
  }
  OnDestroy() {
    this.isManager = false;
    this.isAuthenticated = false;
    this.isAdminRouteSubscription.unsubscribe();
  }
}
