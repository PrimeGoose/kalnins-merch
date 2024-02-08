// ProductNameComponent
import {Component, Input} from '@angular/core';
import {input} from '@angular/core';

@Component({
  selector: 'app-product-name',
  template: ` <p class="font-[900] [text-shadow:_0px_1px_2px_rgb(0_0_0_/_20%)] text-xl">{{ name() }}</p> `,

  standalone: true,
})
export class ProductNameComponent {
  name = input<string | undefined>();
}
