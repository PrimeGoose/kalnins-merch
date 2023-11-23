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
    private supabase: SupabaseService,
  ) {}

  products: Product[] = [];

  login() {
    this.supabase.authWithDiscord();
  }

  async ngOnInit() { }
 
}
