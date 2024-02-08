import {Component, EventEmitter, Input, Output} from '@angular/core';
import {input} from '@angular/core';
import {ProductImageComponent} from '../../../../../../shared/components/product-image/product-image.component';

@Component({
  selector: 'app-preview-images',
  template: `
    <div class="flex flex-row">
      <app-product-image (click)="back()" [imagePath]="selected().previousImage"></app-product-image>

      <app-product-image [imagePath]="selected().currentImage"></app-product-image>

      <app-product-image (click)="forward()" [imagePath]="selected().nextImage"></app-product-image>
    </div>
  `,
  styles: [],
  standalone: true,
  imports: [ProductImageComponent],
})
export class PreviewImagesComponent {
  constructor() {}

  selected = input<any | undefined>();

  onBack = input(new EventEmitter());
  onForward = input(new EventEmitter());

  back() {
    this.onBack().emit();
  }

  forward() {
    this.onForward().emit();
  }
}
