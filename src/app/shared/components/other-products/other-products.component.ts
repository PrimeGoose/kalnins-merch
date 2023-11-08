import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Product} from 'src/app/core/services/product.service';
import {ProductService} from '../../../core/services/product.service';

@Component({
  selector: 'app-other-products',
  template: `
    <h1 class="text-2xl font-semibold text-gray-800 ">Citi Produkti</h1>
    <div class="grid grid-cols-3   gap-1 ">
      <ng-container *ngFor="let product of otherProducts">
        <div class="cursor-pointer bg-[red] flex  rounded overflow-hidden bottom-row gap-1 " (click)="getOtherProduct(product.id)">
          <app-product-image class="" [imagePath]="product.images[0]"></app-product-image>
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
      .bottom-row {
        background-color: pink; /* Light grey for contrast */
        padding: 1rem; /* More space inside the container */
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06); /* Subtle shadow */
        margin-top: 2rem; /* Adds space between the carousel/box and the bottom row */
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
