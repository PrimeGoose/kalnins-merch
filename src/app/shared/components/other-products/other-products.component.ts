import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Product} from 'src/app/core/services/product.service';

@Component({
  selector: 'app-other-products',
  template: `
    <div
      class="text-center text-sm font-bold text-gray-800 mb-4 grid grid-cols-1  min-w-xs  640:grid-cols-2 960:grid-cols-3 1024:max-w-[960px] gap-4 mx-4 mt-20"
    >
      <ng-container *ngFor="let product of otherProducts">
        <app-product-card [product]="product" (productClicked)="getOtherProduct($event)"></app-product-card>
      </ng-container>
    </div>
  `,
  styles: [
    `
      :host {
      }
    `,
  ],
})
export class OtherProductsComponent {
  @Input() otherProducts: Product[] = [];
  @Output() productClick = new EventEmitter<number>();

  getOtherProduct(productId: number) {
    this.productClick.emit(productId);
  }
}
