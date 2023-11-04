// ProductPriceComponent
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-price',
  template: ` <p>{{ price }} {{ currency }}</p> `,
  styles: [
    `
      :host {
        color: #0077b6;
        font-weight: bold;
        text-shadow: 0.5px 0.5px 1px pink; /* Optional: for better readability */
      }
    `,
  ],
})
export class ProductPriceComponent {
  @Input() price!: number;
  @Input() currency!: string;
}
