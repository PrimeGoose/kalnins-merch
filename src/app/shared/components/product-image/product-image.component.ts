import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-image',
  template: ` <img class="max-h-[768px]" loading="lazy" [src]="imagePath" [alt]="altText" /> `,
  styleUrls: ['./product-image.component.scss'],
})
export class ProductImageComponent {
  @Input() imagePath!: string;
  @Input() altText!: string;
}
