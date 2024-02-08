import {Component, Input, isDevMode} from '@angular/core';
import {input} from '@angular/core';

@Component({
  selector: 'app-product-image',
  template: `
    <img [width]="309" [height]="309" class="max-h-[768px]" loading="lazy" [src]="setBaseURL(imagePath()!)" [alt]="altText()" />
  `,
  styleUrls: ['./product-image.component.scss'],
  standalone: true,
})
export class ProductImageComponent {
  imagePath = input<string | undefined>();
  altText = input<string | undefined>();

  setBaseURL(imagePath: string): string {
    const localhost8000 = '';
    if (isDevMode()) {
      return imagePath;
    } else {
      return imagePath;
    }
  }
}
