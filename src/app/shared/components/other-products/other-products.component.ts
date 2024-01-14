import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Product} from '../../../core/models/product.model';
import {ProductService} from '../../../core/services/product.service';

@Component({
  selector: 'app-other-products',
  template: `
    <h1 class="text-3xl font-semibold  mb-4 gradient-text">Citi Produkti</h1>
    <div class="grid grid-cols-1 450:grid-cols-2  768:grid-cols-3  gap-4 ">
      <ng-container *ngFor="let product of otherProducts">
        <div
          class="cursor-pointer  product-card    dark:border-slate-800 dark:border rounded overflow-hidden flex gap-1"
          [routerLink]="['/product', product.product_id]"
          (click)="getOtherProduct(product.product_id)"
        >
          <app-product-image class="max-w-[234px] min-w-[150px]" [imagePath]="product.images[0]"></app-product-image>
        </div>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .gradient-text {
        background: linear-gradient(to right, #0ea5e9, #7f9cf5);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
      }

      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
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
    this.otherProducts = await this.ProductService.loadProducts();
  }

  getOtherProduct(productId: number) {
    this.productClick.emit(productId);
  }
}
