import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Product} from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="cursor-pointer rounded overflow-hidden shadow-lg" (click)="onClick()">
      <app-product-image [imagePath]="product.images[0]"></app-product-image>
      <div class="px-6 py-4 ">
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
        transition: all 0.3s ease-in-out;
      }

      :host:hover {
        transform: scale(1.05);
        background: radial-gradient(circle at center, #d3d3d37a, transparent);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      }
    `,
  ],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() productClicked = new EventEmitter<number>();

  onClick() {
    this.productClicked.emit(this.product.id);
  }
}
