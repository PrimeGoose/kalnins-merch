import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Product} from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="cursor-pointer rounded overflow-hidden shadow-lg hover-effect" (click)="onClick()">
      <app-product-image [imagePath]="product.imgages[0]"></app-product-image>
      <div class="px-6 py-4 ">
        <div class="font-bold text-xl mb-2 product-name ">
          {{ product.name }}
        </div>
        <p class="product-price">Cenas sākot no {{ product.sizes[0].price }} {{ product.currency }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: grid;
        text-align: center;
      }

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
        font-size: 1.2em;
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
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() productClicked = new EventEmitter<number>();

  onClick() {
    this.productClicked.emit(this.product.id);
  }
}
