import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {ShoppingCartService} from 'src/app/core/services/shopping-cart.service';
import {Selected, SelectedProductObject} from '../../../../../../core/models/product.model';
import {BehaviorSubject, Observable, combineLatest, filter, from, map} from 'rxjs';
import {SharedService} from 'src/app/shared/shared.service';
import {input} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-order-form',
    template: `
    <div id="order-actions" class="order-commit-container flex flex-col items-center w-full">
      <form name="emailForm" #emailForm="ngForm" class="flex flex-col w-full text-xs text-center">
        @if(!isAuthenticated){
        <label for="email" class="block   mb-2" [ngClass]="{'invalid-text': !user().emailValidated && user().email}">
          <span *ngIf="user().validationMessage" class="text-red-600">{{ user().validationMessage }}</span>
          <span *ngIf="!user().validationMessage" class=" text-center"> Tavs e-pasts pasūtījumu veikšanai..</span>
        </label>
        <input
          id="email"
          type="email"
          [(ngModel)]="user().email"
          name="emailInput"
          [ngClass]="{'invalid-border': !user().emailValidated && user().email}"
          class="border dark:border-none rounded  text-center dark:bg-gray-800 py-2 mb-2"
          placeholder="Ievadi e-pastu lai pasūtītu.."
          (input)="validateEmail(this.data.data.user().email)"
        />
        <label for="nickname" class="block  text-black dark:text-white py-1">
          Visiem Rojālajiem
          <span class="text-red-600">-15% ATLAIDE</span>
        </label>
        <input
          id="nickname"
          name="nickname"
          type="text"
          class="border dark:border-none rounded  text-center dark:bg-gray-800 py-2 mb-2"
          placeholder="Tavs Rojālais segvārds šeit.."
        />

        }@else{
        <!-- ...existing code... -->
        <ng-container *ngIf="isAuthenticated">
          <div class=" flex flex-col px-1">
            <h2 class="font-bold text-xl mb-2 gradient-text">Apsveicam!</h2>
            <p class="">
              Tu esi kvalificējies kā <span class="font-semibold  text-red-700 italic uppercase">"Rojālais"</span> un saņemsi
              <span class="font-semibold text-red-900">15%</span>atlaidi savam pasūtījumam!
            </p>
            <p class="mt-2">Priecājamies Tevi redzēt mūsu lojālo klientu pulkā.</p>
          </div>
        </ng-container>

        }
      </form>
    </div>

    <div class="flex flex-col items-center">
      <!-- router link to /orders -->
      <button
        [routerLink]="'/orders'"
        (click)="processOrder()"
        id="order-button"
        [ngClass]="{'shake-animation': !user().emailValidated}"
        class=" text-white py-2 mt-2 rounded  text-xl font-black font-serif w-[200px]
      bg-gradient-to-r from-orange-700 via-orange-500 to-orange-800 dark:border-gray-700
      
      
        "
      >
        Pasūtīt
      </button>

      <!-- Jaunā pievienošanas grozam poga -->
      <button
        *ngIf="selected_count_in_cart == 0"
        (click)="addToCart()"
        class="text-white py-2 mt-2 rounded text font-black font-serif w-[200px] bg-gradient-to-r from-orange-700 via-orange-500 to-orange-800 border-gray-700"
      >
        <span class="flex flex-row justify-center">
          <span>Pievienot grozam</span>

          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </span>
        </span>
      </button>

      <div
        *ngIf="selected_count_in_cart > 0"
        class="text-white py-2 mt-2 rounded text font-black font-serif w-[200px] bg-gradient-to-r from-orange-700 via-orange-500 to-orange-800 border-gray-700 flex flex-row justify-around"
      >
        <!-- title -->
        <span class="flex">Grozā:</span>
        <!-- remove button -->

        <button>
          <button class="remove-item flex" (click)="removeItemFromCart(this.selected)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
            </svg>
          </button>
        </button>

        <!-- item count -->
        <span class="item-count flex px-2">
          {{ selected_count_in_cart }}
        </span>
        <!-- add item -->
        <button class="add-item flex" (click)="addToCart()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </div>
  `,
    styles: [
        `
      .gradient-text {
        background: linear-gradient(to right, blue, red, purple);
        -webkit-background-clip: text;
        color: transparent;
      }
    `,
    ],
    standalone: true,
    imports: [
        FormsModule,
        NgClass,
        NgIf,
        RouterLink,
    ],
})
export class OrderFormComponent implements OnInit {
  isAuthenticated: any = false;
  itemsInBasket: any = [];
  data: any = [];
  selected: any = [];
  selected_count_in_cart = 0;
  user = input<any | undefined>();
  onValidateEmail = input<any | undefined>();
  onProcessOrder = input<any | undefined>();
  @Output() addToCartEvent = new EventEmitter();
  constructor(
    private auth: AuthService,
    private shoppingCart: ShoppingCartService,
    private sharedService: SharedService,
  ) {}
  async ngOnInit() {
    this.isAuthenticated = await this.auth.isAuthenticated$.subscribe((data) => {
      this.isAuthenticated = data;
    });

    // this.calculateItemsImBasketBySizeAndPrice();
    this.shoppingCart.calculateSelectedCountInCart().subscribe((count) => {
      this.selected_count_in_cart = count;
    });

    this.shoppingCart.selectedSubject.subscribe((selected) => {
      this.selected = selected[0];
      // console.log('selected changed', this.selected);
    });

    // this.shoppingCart.clearCart();
  }

  public calculateItemsImBasketBySizeAndPrice() {
    return this.shoppingCart.getItems().subscribe((items) => {
      this.itemsInBasket = items;

      this.shoppingCart.getSelected().subscribe((selected) => {
        this.selected = selected[0];

        const basket = this.itemsInBasket;
        const selected_product_id = this.selected?.product_id;
        const selected_size = this.selected?.size;
        this.selected_count_in_cart = basket.filter(
          (item: any) => item?.product_id === selected_product_id && item?.size === selected_size,
        ).length;
      });
    });
  }

  processOrder() {
    this.onProcessOrder().emit();
    // add current selected item to
    if (this.selected_count_in_cart == 0) {
      // this.addToCart() // but onlu if this product id is not in cart with diferent size
    }
  }

  validateEmail(email: string) {
    this.onValidateEmail().emit(email);
  }

  addToCart() {
    this.addToCartEvent.emit();
    this.sharedService.changeCount(this.selected_count_in_cart);
  }
  removeItemFromCart(item: Selected) {
    this.shoppingCart.removeFromCart(item.product_id, item.size);
    this.sharedService.changeCount(this.selected_count_in_cart);
  }
}
