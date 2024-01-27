import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Product} from '../../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  template: `
    <div
      class="cursor-pointer
    dark:bg-[linear-gradient(to_bottom,_rgba(53,_64,_79)_10%,_rgba(30,_40,_54)_50%,_rgba(22,_31,_46)_90%)]
    border-2 border-gray-100 hover:border-gray-300
    dark:border-none
    

   
    bg-gradient-animation 
  "
      (click)="onClick()"
    >
      <app-product-image class=" " [imagePath]="product.images[0]"></app-product-image>
      <app-product-name [name]="product.name"></app-product-name>
      <app-product-price [price]="product.sizes[0].price" [currency]="product.currency"></app-product-price>
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
