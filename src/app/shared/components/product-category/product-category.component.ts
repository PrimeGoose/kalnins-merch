import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-category',
  template: `
    <div class="product-category">
      <span class="product-category__text">{{ category }}</span>
    </div>
  `,
  styles: [],
})
export class ProductCategoryComponent {
  @Input() category: string = 'Accessories';
}
