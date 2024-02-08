import {Component, Input} from '@angular/core';
import {input} from '@angular/core';

@Component({
  selector: 'app-product-category',

  template: `
    <div
      class="product-category
    "
    >
      <span class="product-category__text text-xl ">{{ category() }}</span>
    </div>
  `,
  styles: [],
})
export class ProductCategoryComponent {
  category = input<string>('Accessories');
}
