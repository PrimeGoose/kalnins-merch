import {Component} from '@angular/core';
import {NavigationEnd, Router, RouterModule} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {Product} from 'src/app/core/models/product.model';
import {ProductService} from 'src/app/core/services/product.service';
import {ShoppingCartService} from 'src/app/core/services/shopping-cart.service';
import {SupabaseService} from 'src/app/core/services/supabase.service';
import {LoginComponent} from '../auth-mamager/components/login/login.component';
import {LogoutComponent} from '../auth-mamager/components/logout/logout.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterModule, LoginComponent, LogoutComponent, CommonModule],

  template: `
    <!-- toolbar full wifth   one row hight contains loggin account menu-->
    <!-- <ng-content> </ng-content>
   -->

    <div
      class="flex justify-center gap-1
     "
    >
      <!-- right corner login logout admin -->
      <app-logout *ngIf="isAuthenticated" (click)="checkIfAuthenticated()" class=""></app-logout>

      <app-login *ngIf="!isAuthenticated" (click)="checkIfAuthenticated()" class=""></app-login>

      <button *ngIf="!isAdminRoute && isManager" routerLink="/admin" class="">
        <span class="">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="#5865F2" class="w-16 h-16 ">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </span>
      </button>

      <button *ngIf="isAdminRoute" routerLink="/" class="">
        <span class="shop">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="#5865F2" class="w-16 h-16 ">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
            />
          </svg>
        </span>
      </button>

      <!-- left corner cart and shop -->
      <div class="ml-auto flex">
        <button *ngIf="isAdminRoute && !isAdminRoute" routerLink="/" class="">
          <span class="shop">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="#5865F2" class="w-16 h-16 ">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
              />
            </svg>
          </span>
        </button>
        <!-- place this at right corner -->
        <button *ngIf="isOrdersRoute" routerLink="/" class="">
          <span class="shop">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="#5865F2" class="w-16 h-16 ">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
              />
            </svg>
          </span>
        </button>
        <!-- place this at right corner -->
        <button *ngIf="!isOrdersRoute" class="cart  w-16 h-16 relative bg-transparent ">
          <span class="absolute inset-0 flex justify-center items-center" [routerLink]="['/orders']">
            <!-- how many items in cart -->
            <span
              *ngIf="itemCountInCart"
              class="flex items-center justify-center w-6 h-6 bg-amber-500 border-2 border-yellow-400
             text-slate-800 rounded-full z-10"
              >{{ itemCountInCart }}</span
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.2"
              stroke="#5865F2"
              class="w-16 h-16 absolute"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </span>
        </button>
      </div>
      <!--  -->
    </div>
  `,
  styles: ``,
})
export class ToolbarComponent {
  constructor(
    private productService: ProductService,
    private db: SupabaseService,
    private router: Router,
    private auth: AuthService,
    private cart: ShoppingCartService,
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
  itemCountInCart: any = 0;
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
    // console.log(this.isBaseHref);
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

    this.cart.getItems().subscribe((items) => {
      this.itemCountInCart = items.length;
    });
  }
  ngOnDestroy() {
    this.isManager = false;
    this.isAuthenticated = false;
    this.isAdminRouteSubscription.unsubscribe();
  }
}
