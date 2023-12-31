import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Product} from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="cursor-pointer rounded overflow-hidden shadow-lg relative" (click)="onClick()">
      <div class="absolute inset-0  transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
      <app-product-image class="bg-gradient" [imagePath]="product.images[0]"></app-product-image>
      <div class="px-6 py-4 z-10 relative">
        <app-product-name [name]="product.name"></app-product-name>
        <app-product-price [price]="product.sizes[0].price" [currency]="product.currency"></app-product-price>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        text-align: center;
        display: grid;
        font-family: 'Arial', sans-serif;
        border-radius: 5px;
        position: relative;
        overflow: hidden;
      }

      .bg-gradient {
        background: linear-gradient(to bottom, rgba(10, 14, 20, 1) 10%, rgba(0, 255, 255, 0.1) 50%, rgba(10, 14, 20, 1) 90%);
        background-size: 1% 200%;
        animation: shine 3s linear infinite alternate;
        backdrop-filter: blur(2px);
      }

      :host:hover .bg-gradient {
        opacity: 1;
        background: linear-gradient(to bottom, rgba(10, 14, 20, 1) 10%, rgba(0, 255, 255, 0.75) 50%, rgba(10, 14, 20, 1) 90%);
      }

      :host:not(:hover) .bg-gradient {
        opacity: 1;
        transition: opacity 0.5s ease-out;
      }

      @keyframes shine {
        to {
          background-position: 200% center;
        }
      }
    `,
  ],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() productClicked = new EventEmitter<number>();

  onClick() {
    this.productClicked.emit(this.product.product_id);
  }
}
