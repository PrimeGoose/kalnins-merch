import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-image',
  template: `
    <picture>
      <!-- AVIF format -->
      <source [srcset]="imagePath + '.avif'" type="image/avif" />
      <!-- WebP format -->
      <source [srcset]="imagePath + '.webp'" type="image/webp" />
      <!-- Fallback PNG format -->
      <img loading="lazy" [src]="imagePath + '.png'" alt="Product image" />
    </picture>
  `,
  styleUrls: ['./product-image.component.scss'],
})
export class ProductImageComponent {
  @Input() imagePath!: string;
  @Input() altText!: string;
}
