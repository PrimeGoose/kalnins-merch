import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Product} from '../../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="cursor-pointer rounded overflow-hidden shadow-lg relative bg-gradient" (click)="onClick()">
      <div class="absolute inset-0  transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
      <app-product-image class="brightness-animation" [imagePath]="product.images[0]"></app-product-image>
      <div class="px-6 py-4 z-10 relative">
        <app-product-name [name]="product.name"></app-product-name>
        <app-product-price [price]="product.sizes[0].price" [currency]="product.currency"></app-product-price>
      </div>
    </div>
  `,
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() productClicked = new EventEmitter<number>();

  onClick() {
    this.productClicked.emit(this.product.product_id);
  }
}
