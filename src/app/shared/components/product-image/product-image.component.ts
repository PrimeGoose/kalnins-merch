import {Component, Input, isDevMode} from '@angular/core';

@Component({
  selector: 'app-product-image',
  template: ` <img class="max-h-[768px]" loading="lazy" [src]="setBaseURL(imagePath)" [alt]="altText" /> `,
  styleUrls: ['./product-image.component.scss'],
})
export class ProductImageComponent {
  @Input() imagePath!: string;
  @Input() altText!: string;

  setBaseURL(imagePath: string): string {
    const localhost8000 = '';
    if (isDevMode()) {
      return imagePath;
    } else {
      return imagePath;
    }
  }
}
