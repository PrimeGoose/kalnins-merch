import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductService} from 'src/app/core/services/product.service';
import {Product} from '../../core/models/product.model';
import {trigger, state, style, transition, animate, query, stagger, animateChild} from '@angular/animations';

@Component({
  selector: 'app-home-page',
  animations: [
    trigger('blurAnimation', [
      state(
        'loaded',
        style({
          filter: 'blur(0px)',
        }),
      ),
      state(
        'loading',
        style({
          filter: 'blur(999px)',
        }),
      ),
      transition('loading => loaded', animate('1s linear')),
    ]),

    trigger('slideInFromLeft', [
      transition('* => *', [
        // each time the products change
        query('app-product-card:nth-child(-n+3)', style({transform: 'translateX(-1000%)', opacity: 0}), {
          optional: true,
        }),

        query(
          'app-product-card:nth-child(-n+3)',
          stagger('100ms', [animate('0.5s ease-in-out', style({transform: 'translateX(0)', opacity: 1}))]),
          {
            optional: true,
          },
        ),
      ]),
    ]),
  ],
  template: `
    <div
      [@blurAnimation]="pruducts_count ? 'loaded' : 'loading'"
      class=" grid grid-cols-1 640:grid-cols-2 960:grid-cols-3 gap-4 max-w-[320px] 640:max-w-[640px] 960:max-w-[960px] "
    >
      <app-product-card
        [@slideInFromLeft]
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

      // // app-product-card children  1 2 3 slide in from right
      // app-product-card:nth-child(1),
      // app-product-card:nth-child(2),
      // app-product-card:nth-child(3) {
      //   animation: slideInFromLeft 0.5s ease-in-out;
      // }

      // // app-product-card children 4 5 6 slide in from left
      // app-product-card:nth-child(4),
      // app-product-card:nth-child(5),
      // app-product-card:nth-child(6) {
      //   animation: slideInFromLeft 0.75s ease-in-out;
      // }

      // // app-product-card children 7 8 9 slide in from right
      // app-product-card:nth-child(7),
      // app-product-card:nth-child(8),
      // app-product-card:nth-child(9) {
      //   animation: slideInFromRight 1s ease-in-out;
      // }
      // // app-product-card everything  thats left slide from bottom
      // app-product-card {
      //   animation: slideInFromBottom 1.25s ease-in-out;
      // }

      // // app-product-card everything  thats left slide from bottom
      // @keyframes slideInFromLeft {
      //   0% {
      //     transform: translateX(-1000%);
      //   }
      //   100% {
      //     transform: translateX(0);
      //   }
      // }
      // // app-product-card everything  thats left slide from bottom
      // @keyframes slideInFromRight {
      //   0% {
      //     transform: translateX(1000%);
      //   }
      //   100% {
      //     transform: translateX(0);
      //   }
      // }
      // // app-product-card everything  thats left slide from bottom
      // @keyframes slideInFromBottom {
      //   0% {
      //     transform: translateY(1000%);
      //   }
      //   100% {
      //     transform: translateY(0);
      //   }
      // }
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
