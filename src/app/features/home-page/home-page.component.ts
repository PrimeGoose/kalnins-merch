// product-home.component.ts

import {Component, OnInit} from '@angular/core';
import {Product} from '../../core/services/product.service';
import {ProductService} from '../../core/services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  template: `
    <div class="grid grid-cols-1   640:grid-cols-2 960:grid-cols-3 gap-4    max-w-[320px] 640:max-w-[640px] 960:max-w-[960px]">
      <div
        *ngFor="let product of products"
        class="cursor-pointer rounded overflow-hidden shadow-lg hover-effect product-card"
        [routerLink]="['/product']"
        (click)="storeProductID(product.id)"
      >
        <picture>
          <!-- AVIF format -->
          <source [srcset]="product.imgages[0] + '.avif'" type="image/avif" />
          <!-- WebP format -->
          <source [srcset]="product.imgages[0] + '.webp'" type="image/webp" />

          <img class="w-full" loading="lazy" height="300px" width="300px" [src]="product.imgages[0] + '.png'" alt="Product image" />
        </picture>
        <div class="px-6 py-4 ">
          <div class="font-bold text-xl mb-2 product-name ">
            {{ product.name }}
          </div>
          <p class="product-price">Cenas sākot no {{ product.sizes[0].price }} {{ product.currency }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .product-card {
        font-family: 'Arial', sans-serif;
        background: radial-gradient(circle at center, lightgray, transparent);
        padding: 15px;
        border-radius: 5px;
        transition: transform 0.3s ease-in-out;
      }

      /* Product name on the card */
      .product-name {
        color: gray; /* Light gray */
        font-size: 1.3em;
        margin-bottom: 10px;
        text-shadow: 0.5px 0.5px 1px pink; /* Optional: for better readability */
      }

      /* Product price on the card */
      .product-price {
        color: #0077b6;
        font-weight: bold;
        text-shadow: 0.5px 0.5px 1px pink; /* Optional: for better readability */
      }

      .hover-effect {
        transition: all 0.3s ease-in-out;
      }

      .hover-effect:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
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
