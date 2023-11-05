import {Component, OnInit} from '@angular/core';
import {Product, ProductService} from './core/services/product.service';

@Component({
  selector: 'app-root',
  template: `
    <!-- <app-merch-header></app-merch-header>
    <router-outlet></router-outlet> -->
    <app-product-page [product]="product"></app-product-page>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  constructor(private productService: ProductService) {
  }

  product: Product = {} as Product;
  async ngOnInit() {
    const product = await this.productService.getProductById(0);
    if (product) {
      this.product = product;
      console.log(this.product, 'productsss');
    } else {
      // Handle the case when the product is not found (maybe assign a default product or show an error)
    }
  }
}
