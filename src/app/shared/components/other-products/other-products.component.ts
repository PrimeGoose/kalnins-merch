import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Product} from 'src/app/core/services/product.service';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-other-products',
  template: `
    <div class="text-center text-sm font-bold text-gray-800  flex  gap-2 w-full  ">
      <ng-container *ngFor="let product of otherProducts">
        <!-- <div *ngIf="product.id !== currentProductId"> -->
          <!-- <app-product-card [product]="product" (productClicked)="getOtherProduct($event)"></app-product-card> -->

          <div class="cursor-pointer rounded overflow-hidden  " (click)="getOtherProduct(product.id)">
            <app-product-image class="" [imagePath]="product.images[0]"></app-product-image>
          <!-- </div> -->
        </div>
      </ng-container>
    </div>
  `,
  styles: [
    `
      :host {
        @apply place-self-center
        w-full
        ;
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
