import {Component, EventEmitter, Input, Output} from '@angular/core';
import {style} from '@angular/animations';

@Component({
  selector: 'app-buy-box',
  template: `
    <div
      class="px-4 flex flex-col items-center justify-center place-self-center  shadow-md dark:bg-slate-800   pb-4 pt-4 768:flex 768:justify-center"
    >
      <app-product-category [category]="selected.category"></app-product-category>
      <app-product-name [name]="selected.name"></app-product-name>

      <!-- <app-preview-images [selected]="selected" [onBack]="onBack" [onForward]="onForward"></app-preview-images> -->

      <!-- detail header -->
      <app-detail-header [selected]="selected"></app-detail-header>

      <!-- size selector -->

      <app-size-selector [selected]="selected" [onSelectSize]="onSelectSize" (onSelectSize)="selectSize($event)"></app-size-selector>

      <!-- order form -->
      <app-order-form [user]="user" [onValidateEmail]="onValidateEmail" [onProcessOrder]="onProcessOrder"></app-order-form>
    </div>
  `,
  styleUrls: ['./buy-box.component.scss'],
  styles: [``],
})
export class BuyBoxComponent {
  @Input() selected: any;
  @Input() user: any;

  @Output() onBack = new EventEmitter();
  @Output() onForward = new EventEmitter();

  @Output() onProcessOrder = new EventEmitter();
  @Output() onValidateEmail = new EventEmitter();

  @Output() onSelectSize = new EventEmitter();

  back() {
    this.onBack.emit();
  }

  forward() {
    this.onForward.emit();
  }

  selectSize(size: any) {
    this.onSelectSize.emit(size);
  }
}
