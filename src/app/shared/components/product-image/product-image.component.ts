import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-image',
  template: `
    <ng-container *ngIf="isBase64Image(imagePath); else urlImageTemplate">
      <img class="max-h-[768px]" loading="lazy" [src]="imagePath" [alt]="altText" />
    </ng-container>
    <ng-template #urlImageTemplate>
      <picture>
        <!-- AVIF format -->
        <source [srcset]="imagePath + '.avif'" type="image/avif" />
        <!-- WebP format -->
        <source [srcset]="imagePath + '.webp'" type="image/webp" />
        <!-- Fallback PNG format -->
        <img class="max-h-[768px]" loading="lazy" [src]="imagePath + '.png'" [alt]="altText" />
      </picture>
    </ng-template>
  `,
  styleUrls: ['./product-image.component.scss'],
})
export class ProductImageComponent {
  @Input() imagePath!: string;
  @Input() altText!: string;

  isBase64Image(path: string): boolean {
    return /^data:image\/[a-zA-Z]+;base64,/.test(path);
  }
}
