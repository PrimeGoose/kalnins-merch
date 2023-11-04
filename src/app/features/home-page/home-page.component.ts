// home-page.component.ts

import {Component, OnInit} from '@angular/core';
import {Product} from '../../core/services/product.service';
import {ProductService} from '../../core/services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  template: `
    <div class="grid grid-cols-1 640:grid-cols-2 960:grid-cols-3 gap-4 max-w-[320px] 640:max-w-[640px] 960:max-w-[960px]">
      <app-product-card *ngFor="let product of products" [product]="product" (productClicked)="storeProductID($event)"></app-product-card>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `,
  ],
})
export class HomePageComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.products = this.productService.getAllProducts();
  }

  storeProductID(id: number) {
    this.productService.storeProductID(id);
  }

  onImageLoad(event: Event, imagePath: string): void {
    const imgElement = event.target as HTMLImageElement;
    const img = new Image();

    img.src = imagePath + '.jpg';

    img.onload = () => {
      imgElement.src = imagePath + '.jpg';
    };
  }
}
