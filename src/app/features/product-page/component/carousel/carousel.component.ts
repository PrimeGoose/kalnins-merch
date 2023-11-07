import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-carousel',
  template: `
    <div class="image-section  bg-foreground  flex flex-col content-center 768:justify-center  768:max-w-none 768:grid 768:grid-rows-1">
      <!-- pruduct title -->
      <!-- <div id="product-title" class="flex flex-col items-center">
        <app-product-category [category]="selected.category"></app-product-category>
        <app-product-name [name]="selected.name"></app-product-name>
        <app-product-price [price]="selected.price" [currency]="selected.currency"></app-product-price>
      </div> -->

      <div
        id="product-images"
        (touchend)="SwipeEnd($event)"
        (touchstart)="SwipeStart($event)"
        class="place-content-center flex flex-col overflow-hidden relative w-full"
      >
        <div class="chevron-container z-10 w-full h-full absolute items-center flex">
          <div
            (click)="back()"
            class="chevron-left justify-start hidden 450:flex w-9 h-16 left-0 absolute items-center hover:bg-gradient-to-r from-neutral-50 to-transparent"
          >
            <app-chevron-left></app-chevron-left>
          </div>
          <div
            (click)="forward()"
            class="chevron-right justify-end w-9 h-16 right-0 absolute items-center hidden 450:flex hover:bg-gradient-to-r to-neutral-50 from-transparent"
          >
            <app-chevron-right></app-chevron-right>
          </div>
        </div>

        <app-product-image class="max-h-[768px]" [imagePath]="selected.currentImage"></app-product-image>
      </div>
      <!-- <app-preview-images [selected]="selected" [onBack]="onBack" [onForward]="onForward"></app-preview-images> -->
      
    </div>
  `,
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() selected: any;

  @Output() onSwipeStart = new EventEmitter();
  @Output() onSwipeEnd = new EventEmitter();

  @Output() onBack = new EventEmitter();
  @Output() onForward = new EventEmitter();

  SwipeStart(event: any) {
    this.onSwipeStart.emit(event);
  }
  SwipeEnd(event: any) {
    this.onSwipeEnd.emit(event);
  }
  back() {
    this.onBack.emit();
  }
  forward() {
    this.onForward.emit();
  }
}
