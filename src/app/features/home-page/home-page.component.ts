// home-page.component.ts
import {Component, OnInit} from '@angular/core';
import {Observable, from} from 'rxjs';
import {ProductService} from 'src/app/core/services/product.service';
import {Product} from '../../core/models/product.model';
@Component({
  selector: 'app-home-page',
  template: `
    <div class="grid grid-cols-1 640:grid-cols-2 960:grid-cols-3 gap-4 max-w-[320px] 640:max-w-[640px] 960:max-w-[960px] ">
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
  products$: Observable<Product[]> = from(this.productService.loadProducts());

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    from(await this.productService.loadProducts());
  }
}
