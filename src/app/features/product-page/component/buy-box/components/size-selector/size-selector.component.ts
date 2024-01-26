import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {SharedService} from 'src/app/shared/shared.service';

@Component({
  selector: 'app-size-selector',
  template: `
    <div
      id="size-selector"
      class="grid grid-cols-3 place-items-center gap-1 
     my-2"
    >
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
          <span *ngIf="currentCount>0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </span>
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
export class SizeSelectorComponent implements OnInit {
  constructor(private sharedService: SharedService) {}

  currentCount = 0;
  ngOnInit(): void {
    this.sharedService.currentCount.subscribe((count) => (this.currentCount = count));
  }
  @Input() selected: any;

  @Input() onSelectSize = new EventEmitter();

  selectSize(item: any) {
    this.onSelectSize.emit(item);
  }
}
