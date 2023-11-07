import {Component, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-size-selector',
  template: `
    <div id="size-selector" class="grid grid-cols-4 place-items-center gap-1 text-[#727272]  my-4">
      <ng-container *ngFor="let item of selected.sizes">
        <!-- Button with conditional styling based on availability and selection -->
        <!-- Button with conditional styling based on availability and selection -->
        <button
          *ngIf="item.available"
          (click)="selectSize(item)"
          [ngClass]="{
            'bg-pink-600 text-white border-pink-600 text-lg opacity-90 scale-100 duration-1000': selected.size === item.size && item.available,
            ' font-[900] hover:scale-y-105 text-base  ': selected.size === item.size && item.available
          }"
          class=" duration-1000 font-[600]  ease-in-out border-2 rounded-none flex items-center justify-center h-11 w-11 stroke-[#ee0000]  border-[#7d7d7d52] "
        >
          {{ item.size }}
        </button>

        <!-- Button when the item is not available -->
        <button
          *ngIf="!item.available"
          class="border-2 rounded-none flex items-center justify-center h-11 w-11 text-slate-300 border-slate-300 "
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
