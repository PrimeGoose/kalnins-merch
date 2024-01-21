import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductService} from 'src/app/core/services/product.service';
import {Product} from '../../core/models/product.model';
import {slideInFromRight} from 'src/app/core/animations/slideInFromRight';

@Component({
  selector: 'app-home-page',
  animations: [slideInFromRight],
  template: `
    <div
      [@slideInFromRight]="pruducts_count ? 'loaded' : 'loading'"
      class=" grid grid-cols-1 640:grid-cols-2 960:grid-cols-3 gap-4 max-w-[320px] 640:max-w-[640px] 960:max-w-[960px] "
    >
      <app-product-card
        [routerLink]="['/product', product.product_id]"
        *ngFor="let product of products$ | async"
        [product]="product"
      ></app-product-card>
    </div>
  `,
  styles: [
    `
      :host {
        display: grid;
        place-items: center;
        flex-direction: column;
        align-items: center;
      }
    `,
  ],
})
export class HomePageComponent implements OnInit {
  products$: Observable<Product[]> = this.productService.product$;
  dataLoaded: boolean = false;
  pruducts_count = 0;

  constructor(public productService: ProductService) {
    this.productService.loadProducts();
    // console.log('HomePageComponent',this.productService.dataLoaded);
    this.dataLoaded = this.productService.dataLoaded;
    // console.log('HomePageComponent',this.dataLoaded);
    this.products$.subscribe((products) => {
      this.pruducts_count = products.length;
      console.log('HomePageComponent', this.pruducts_count);
    });
  }

  async ngOnInit() {}
}
