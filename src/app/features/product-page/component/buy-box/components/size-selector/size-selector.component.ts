import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductService} from 'src/app/core/services/product.service';
import {ShoppingCartService} from 'src/app/core/services/shopping-cart.service';
import {SharedService} from 'src/app/shared/shared.service';

@Component({
  selector: 'app-size-selector',
  template: `
    <div
      id="size-selector"
      class="grid grid-cols-3 place-items-center gap-1 
     my-2"
    >
      <ng-container *ngFor="let item of sizes">
        <button
          *ngIf="item.available"
          (click)="selectSize(item)"
          [ngClass]="{
            ' border-red-700 bg-gray-700': productVariant.size === item.size && item.available,
            ' font-[900]  text-base   ': productVariant.size === item.size && item.available
          }"
          class=" duration-200 hover:scale-125  border-2 rounded-none flex items-center justify-center h-9 w-16 dark:border-none font-black 
          
          "
        >
          <span class=" duration-200 flex row items-center gap-0">
            <span *ngIf="item.in_cart > 0">
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
            {{ item.size }}
          </span>
        </button>

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
  constructor(
    private soppingService: ShoppingCartService,
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {}

  currentCount = 0;
  sizes: any = [];
  id = parseInt(this.route.snapshot.paramMap.get('id') ?? '0', 10);
  idSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0); // or any default value

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = parseInt(params.get('id') ?? '0', 10);
      this.productService.get_product_sizes(this.id).subscribe((sizes) => {
        this.sizes = sizes;
        // console.log('sizes', sizes);
      });
    });
  }
  @Input() productVariant: any;

  @Input() onSelectSize = new EventEmitter();

  selectSize(item: any) {
    this.onSelectSize.emit(item);
  }
  async ngAfterViewInit() {}
}
