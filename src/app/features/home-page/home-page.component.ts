import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductService} from 'src/app/core/services/product.service';
import {Product} from '../../core/models/product.model';
import {slideInFromRight} from 'src/app/core/animations/slideInFromRight';
import {Router} from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-home-page',
    animations: [slideInFromRight],
    template: `
    <div
      [@slideInFromRight]="pruducts_count ? 'loaded' : 'loading'"
      class=" grid grid-cols-1 640:grid-cols-2 960:grid-cols-3 gap-4 max-w-[320px] 640:max-w-[640px] 960:max-w-[960px] "
    >
      <app-product-card *ngFor="let product of products$ | async" (click)="goToProductPage(product)" [product]="product"></app-product-card>
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
    standalone: true,
    imports: [
        NgFor,
        ProductCardComponent,
        AsyncPipe,
    ],
})
export class HomePageComponent implements OnInit {
  products$: Observable<Product[]> = this.productService.product$;
  dataLoaded: boolean = false;
  pruducts_count = 0;

  constructor(
    public productService: ProductService,
    private router: Router,
  ) {
    this.productService.loadProducts();
    this.products$.subscribe((products) => {
      this.dataLoaded = this.productService.dataLoaded;
      this.pruducts_count = products.length;
      this.dataLoaded = true;
    });
  }

  goToProductPage(product: Product) {
    this.router.navigate(['/product', product.product_id]);
  }

  async ngOnInit() {}
}
