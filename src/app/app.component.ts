import {Component, OnInit, Injectable} from '@angular/core';
import {Product, ProductService} from './core/services/product.service';
import {SupabaseService} from './core/services/supabase.service';

@Component({
  selector: 'app-root',
  // standalone: true,
  template: `
    <app-toolbar class="">
      <!-- link to /admin -->

      <button
        *ngIf="isManager"
        routerLink="/admin"
        class="h-fit flex items-center bg-slate-100 dark:bg-slate-800 border border-gray-300 dark:border-black rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <span
          class="h-[24px] 
        "
          >Admin
        </span>
      </button>
      @if(isAuthenticated){

      <app-logout (click)="checkIfAuthenticated()" class=""></app-logout>
      } @if(!isAuthenticated) {
      <app-login (click)="checkIfAuthenticated()" class=""></app-login>
      }

      <!-- <div id="toolbar" class="">
        <input type="text" [(ngModel)]="testAccessToTableInput" placeholder="test access to table kalnins merch products" />
        <button style="margin: 10px;" (click)="testAccessToTable(testAccessToTableInput)">Test</button>
        <button style="margin: 10px;" (click)="getUser()">getuser</button>
        <button style="margin: 10px;" (click)="getStoreManagerTable()">getStoreManagerTable</button>
        <button style="margin: 10px;" (click)="insertRandomData()">insertRandomData</button>
        <pre>{{ result | json }}</pre>
      </div> -->
    </app-toolbar>
    <app-merch-header></app-merch-header>
    <router-outlet></router-outlet>
    <!-- <app-product-page [products]="products"></app-product-page> -->
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private supabase: SupabaseService,
  ) {}

  isManager: boolean = false;
  products: Product[] = [];
  isAuthenticated: boolean = false;
  testAccessToTableInput: string = '';
  result: any;
  user: any;
  userId: any;

  login() {
    this.supabase.authWithDiscord();
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
  }
}
