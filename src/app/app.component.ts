import {Component, OnInit} from '@angular/core';
import {Product, ProductService} from './core/services/product.service';

@Component({
  selector: 'app-root',
  template: `
    <!-- <app-merch-header></app-merch-header> -->
    <!-- <router-outlet></router-outlet> -->
    <app-product-page [products]="products"></app-product-page>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  constructor(private productService: ProductService) {}

  products: Product[] = [];

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
