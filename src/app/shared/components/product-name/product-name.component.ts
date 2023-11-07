// ProductNameComponent
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-name',
  template: ` <p class="font-[900] [text-shadow:_0px_1px_2px_rgb(0_0_0_/_20%)]">{{ name }}</p> `,
  styles: [
    `
      :host {
        /* text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); */
      }
    `,
  ],
})
export class ProductNameComponent {
  @Input() name!: string;
}
