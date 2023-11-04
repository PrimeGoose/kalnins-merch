import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-product-image',
  template: `
  <picture>
  <!-- AVIF format -->
  <source [srcset]="imagePath + '.avif'" type="image/avif" />
  <!-- WebP format -->
  <source [srcset]="imagePath + '.webp'" type="image/webp" />
  <!-- Fallback PNG format -->
  <img class="w-full" loading="lazy"  [src]="imagePath + '.png'" alt="Product image" />
</picture>

  `,
  styles: [
    `
:host{
  @apply
w-full
pb-[100%]

    
   
 
}


    `,
  ]
})
export class ProductImageComponent {
  @Input() imagePath!: string;
}
