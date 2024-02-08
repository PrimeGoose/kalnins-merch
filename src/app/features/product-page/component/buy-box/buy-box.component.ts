import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product, Selected, SelectedProductObject} from '../../../../core/models/product.model';
import {ShoppingCartService} from 'src/app/core/services/shopping-cart.service';
import {input} from '@angular/core';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { SizeSelectorComponent } from './components/size-selector/size-selector.component';
import { DetailHeaderComponent } from './components/detail-header/detail-header.component';
import { ProductNameComponent } from '../../../../shared/components/product-name/product-name.component';
import { ProductCategoryComponent } from '../../../../shared/components/product-category/product-category.component';

@Component({
    selector: 'app-buy-box',
    template: `
    <div
      class="px-4 flex flex-col items-center justify-center place-self-center 768:border-l-2 border-zinc-200 dark:border-zinc-800
      
         pb-4 pt-4 768:flex 768:justify-center dark:text-zinc-400 text-zinc-700"
    >
      <app-product-category [category]="selectedProductObject().category"></app-product-category>
      <app-product-name [name]="selectedProductObject().name"></app-product-name>

      <!-- <app-preview-images [selected]="selected" [onBack]="onBack" [onForward]="onForward"></app-preview-images> -->

      <!-- detail header -->
      <app-detail-header [selected]="selectedProductObject()"></app-detail-header>

      <!-- size selector -->

      <app-size-selector [productVariant]="selectedProductObject()" [onSelectSize]="onSelectSize"></app-size-selector>

      <!-- order form -->
      <app-order-form
        [user]="user()"
        [onValidateEmail]="onValidateEmail"
        (addToCartEvent)="addToCard(selectedProductObject())"
        [onProcessOrder]="onProcessOrder"
      ></app-order-form>
    </div>
  `,
    styleUrls: ['./buy-box.component.scss'],
    styles: [``],
    standalone: true,
    imports: [
        ProductCategoryComponent,
        ProductNameComponent,
        DetailHeaderComponent,
        SizeSelectorComponent,
        OrderFormComponent,
    ],
})
export class BuyBoxComponent {
  constructor(private shoppingCart: ShoppingCartService) {}
  selectedProductObject = input<SelectedProductObject>({} as SelectedProductObject);
  user = input<any | undefined>();

  @Output() onBack = new EventEmitter();
  @Output() onForward = new EventEmitter();

  @Output() onProcessOrder = new EventEmitter();
  @Output() onValidateEmail = new EventEmitter();

  @Output() onSelectSize = new EventEmitter();

  back() {
    this.onBack.emit();
  }
  selected: Selected = {} as Selected;

  addToCard(product: SelectedProductObject) {
    const selected: Selected = {
      name: product.name,
      price: product.price,
      category: product.category,
      size: product.size,
      color_name: product.color_name,
      image: product.images[0],
      product_id: product.product_id,
    };
    this.selected = selected;
    // console.log('add to cart SELECTED:', selected);
    this.shoppingCart.addToCart(selected);
  }

  forward() {
    this.onForward.emit();
  }

  selectSize(size: any) {
    this.onSelectSize.emit(size);
    // console.log('size selected', size);
  }
}
