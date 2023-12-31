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
      }
    `,
  ],
})
export class ProductPriceComponent {
  @Input() price!: number;
  @Input() currency!: string;
}
