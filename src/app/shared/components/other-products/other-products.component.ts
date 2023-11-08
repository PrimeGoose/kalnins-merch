import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Product} from 'src/app/core/services/product.service';
import {ProductService} from '../../../core/services/product.service';

@Component({
  selector: 'app-other-products',
  template: `
    <h1 class="text-3xl font-semibold text-gray-900 mb-4">Citi Produkti</h1>
    <div class="grid grid-cols-3 gap-4 place-items-center">
      <ng-container *ngFor="let product of otherProducts">
        <div
          class="cursor-pointer bg-white product-card rounded overflow-hidden flex justify-center items-center gap-4 p-4"
          (click)="getOtherProduct(product.id)"
        >
          <app-product-image class="w-1/2" [imagePath]="product.images[0]"></app-product-image>
        </div>
      </ng-container>
    </div>
  `,
  styles: [
    `
      :host {
        @apply place-self-center
        w-full;
      }
      .product-card {
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
    `,
  ],
})
export class OtherProductsComponent implements OnInit {
  constructor(private ProductService: ProductService) {}

  @Input() currentProductId: number = 0;
  otherProducts: Product[] = [];
  @Output() productClick = new EventEmitter<number>();

  async ngOnInit() {
    this.otherProducts = await this.ProductService.getAllProducts();
  }

  getOtherProduct(productId: number) {
    this.productClick.emit(productId);
  }
}
