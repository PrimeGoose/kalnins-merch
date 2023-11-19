import {Component, OnInit, Injectable} from '@angular/core';
import {Product, ProductService} from './core/services/product.service';
import {SupabaseService} from './core/services/supabase.service';

@Component({
  selector: 'app-root',
  template: `
    <app-merch-header (click)="login()"></app-merch-header>
    <router-outlet></router-outlet>
    <!-- <app-product-page [products]="products"></app-product-page> -->
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private auth: SupabaseService,
  ) {}

  products: Product[] = [];

  login() {
    this.auth.authWithDiscord();
  }

  async ngOnInit() {
    const products = await this.productService.getAllProducts();
    if (products) {
      this.products = products;
      console.log(this.products, 'productsss');
    } else {
      // Handle the case when the product is not found (maybe assign a default product or show an error)
    }
  }
}
