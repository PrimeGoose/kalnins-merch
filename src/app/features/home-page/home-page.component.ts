// home-page.component.ts
import {Component, OnInit} from '@angular/core';
import {Observable, from} from 'rxjs';
import {ProductService} from 'src/app/core/services/product.service';
import {Product} from '../../core/models/product.model';
@Component({
  selector: 'app-home-page',
  template: `
    <div class=" grid grid-cols-1 640:grid-cols-2 960:grid-cols-3 gap-4 max-w-[320px] 640:max-w-[640px] 960:max-w-[960px] ">
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
        animation: blur_foe_2_seconds 1s linear;
      }
      @keyframes blur_foe_2_seconds {
        0% {
          filter: blur(999px);
        }
        100% {
          filter: blur(0px);
          // add all the css effects
        }
      }

      // app-product-card children  1 2 3 slide in from right
      app-product-card:nth-child(1),
      app-product-card:nth-child(2),
      app-product-card:nth-child(3) {
        animation: slideInFromLeft 0.5s ease-in-out;
      }

      // app-product-card children 4 5 6 slide in from left
      app-product-card:nth-child(4),
      app-product-card:nth-child(5),
      app-product-card:nth-child(6) {
        animation: slideInFromLeft 0.75s ease-in-out;
      }

      // app-product-card children 7 8 9 slide in from right
      app-product-card:nth-child(7),
      app-product-card:nth-child(8),
      app-product-card:nth-child(9) {
        animation: slideInFromRight 1s ease-in-out;
      }
      // app-product-card everything  thats left slide from bottom
      app-product-card {
        animation: slideInFromBottom 1.25s ease-in-out;
      }

      // app-product-card everything  thats left slide from bottom
      @keyframes slideInFromLeft {
        0% {
          transform: translateX(-1000%);
        }
        100% {
          transform: translateX(0);
        }
      }
      // app-product-card everything  thats left slide from bottom
      @keyframes slideInFromRight {
        0% {
          transform: translateX(1000%);
        }
        100% {
          transform: translateX(0);
        }
      }
      // app-product-card everything  thats left slide from bottom
      @keyframes slideInFromBottom {
        0% {
          transform: translateY(1000%);
        }
        100% {
          transform: translateY(0);
        }
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
