// ProductNameComponent
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-name',
  template: ` <p>{{ name }}</p> `,
  styles: [
    `
      :host {
        color: gray;
        font-size: 1.2em;
        margin-bottom: 10px;
        text-shadow: 0.5px 0.5px 1px pink;
        font-weight: bold;
      }
    `,
  ],
})
export class ProductNameComponent {
  @Input() name!: string;
}
