import {Component, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-size-selector',
  template: `
    <div id="size-selector" class="grid grid-cols-3 place-items-center gap-1  my-2">
      <ng-container *ngFor="let item of selected.sizes">
        <!-- Button with conditional styling based on availability and selection -->
        <button
          *ngIf="item.available"
          (click)="selectSize(item)"
          [ngClass]="{
            'bg-gradient-to-r from-pink-600 via-pink-500 to-pink-700 text-gray-300 border-pink-600  fade ease-in-out  scale-100 duration-500':
              selected.size === item.size && item.available,
            ' font-[900]  text-base  ': selected.size === item.size && item.available
          }"
          class=" duration-200    ease-in-out border-2 rounded-none flex items-center justify-center h-9 w-16 dark:border-none font-black
          
          "
        >
          <span class="hover:scale-150 duration-200">
            {{ item.size }}
          </span>
        </button>

        <!-- Button when the item is not available -->
        <button
          *ngIf="!item.available"
          class="border-2  rounded-none
        
        items-center justify-center h-9 w-16 text-gray-700 border-none hover:cursor-not-allowed line-through
         "
        >
          {{ item.size }}
        </button>
      </ng-container>
    </div>
  `,
  styles: [
    `
      :host {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
      }
    `,
  ],
})
export class SizeSelectorComponent {
  constructor() {}

  @Input() selected: any;

  @Input() onSelectSize = new EventEmitter();

  selectSize(item: any) {
    this.onSelectSize.emit(item);
  }
}
