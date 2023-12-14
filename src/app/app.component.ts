import {Component, OnInit, Injectable} from '@angular/core';
import {Product, ProductService} from './core/services/product.service';
import {SupabaseService} from './core/services/supabase.service';

@Component({
  selector: 'app-root',
  // standalone: true,
  template: `
    <app-toolbar class="">
      <!-- link to /admin -->
      <a class="text-white hover:text-gray-200 hover:underline" routerLink="/admin">Admin</a>
      <app-login class=""></app-login>
      <div id="toolbar" class="">
        <input type="text" [(ngModel)]="testAccessToTableInput" placeholder="test access to table kalnins merch products" />
        <!-- button  -->
        <button style="margin: 10px;" (click)="testAccessToTable(testAccessToTableInput)">Test</button>
        <!-- getuser btn -->
        <button style="margin: 10px;" (click)="getUser()">getuser</button>
        <!-- get store manager table btn -->
        <button style="margin: 10px;" (click)="getStoreManagerTable()">getStoreManagerTable</button>
        <!-- inset random data btn  -->
        <button style="margin: 10px;" (click)="insertRandomData()">insertRandomData</button>
        <pre>{{ result | json }}</pre>
      </div>
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

  checkIfAuthenticated() {
    localStorage.getItem('supabase.auth.token') ? (this.isAuthenticated = true) : (this.isAuthenticated = false);
  }

  async getUser() {
    const {data} = await this.supabase.supabase.auth.getUser();
    console.log('user', data);
    this.userId = data.user?.id;

    this.user = data;
  }

  async getStoreManagerTable() {
    const {data, error} = await this.supabase.supabase.from('store_managers').select('*').eq('user_id', this.userId);

    console.log('store manager table', data);
  }

  async insertRandomData() {
    /**
       * create table
  public.products (
    product_id serial,
    name character varying(255) not null,
    description text null,
    category character varying(100) null,
    constraint products_pkey primary key (product_id)
  ) tablespace pg_default;
       * */
  await this.supabase.supabase.from('products').insert([
      {name: 'Product 1', description: 'Product 1 description', category: 'Category 1'}
    ]).then((result) => {
      console.log('insert result', result);
    });

  }

  async ngOnInit() {}
}
