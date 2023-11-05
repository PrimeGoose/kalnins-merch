import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-category',
  template: ` <p>product-category works!</p> `,
  styles: [],
})
export class ProductCategoryComponent {
  @Input() category: string = 'Accessories';
}


