import {Component, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-size-selector',
  template: `
    <div id="size-selector" class="grid place-items-center gap-1 w-[90%] max-w-[320px]">
      <ng-container *ngFor="let item of selected.sizes">
        <button
          *ngIf="item.available"
          (click)="selectSize(item)"
          [ngClass]="{
            'selected-button': selected.size === item.size && item.available
          }"
          class="border-x-2 border-y-2 768:flex-row 768:place-content-around rounded-none flex flex-col place-items-center justify-center h-10 w-full border-slate-400"
        >
          {{ item.size }}
        </button>

        <button
          *ngIf="!item.available"
          class="border-x-2 border-y-2 768:flex-row 768:place-content-around rounded-none flex flex-col place-items-center justify-center h-10 w-full text-slate-300 border-slate-300"
        >
          {{ item.size }}
        </button>
      </ng-container>
    </div>
  `,
  styles: [
    `
      /* other */
      button {
        transition:
          background-color 0.3s,
          color 0.3s,
          border-color 0.3s,
          font-size 0.3s,
          font-weight 0.3s,
          opacity 0.3s; /* transition added */
      }

      .selected-button {
        background-color: #d45d90; /* deeper shade of pink */
        color: white;
        border: 2px solid #d45d90;
        font-size: x-large;
        font-weight: bold;
        opacity: 0.9; /* slightly less than 1 for a subtle fade-in effect */
        transform: scale(1.05); /* slightly larger size for a popping effect */
        transition:
          background-color 0.3s,
          color 0.3s,
          border-color 0.3s,
          font-size 0.3s,
          font-weight 0.3s,
          opacity 0.3s,
          transform 0.3s; /* transition added */
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
