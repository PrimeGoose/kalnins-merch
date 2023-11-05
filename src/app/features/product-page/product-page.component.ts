import {Component, Renderer2, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Product, Size, ProductService} from '../../core/services/product.service';

import {RouteStateService} from '../../route-state.service';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-product-page',
  animations: [
    trigger('fadeInOut', [state('default', style({opacity: 1})), state('out', style({opacity: 0})), transition('* <=> *', animate(500))]),
  ],
  template: `
    <div #productContainer class="product-container flex flex-col justify-center mt-1  shadow-2xl shadow-pink-300 ">
      <div
        class="image-section flex flex-col 768:grid grid-cols-[1fr,320px] content-center 768:justify-center max-w-[480px] 768:max-w-none   "
      >
        <!-- pruduct title -->
        <div id="product-title" class="flex flex-col  items-center 768:hidden">
          <app-product-category [category]="product.category"></app-product-category>
          <app-product-name [name]="product.name"></app-product-name>
          <app-product-price [price]="price" [currency]="product.currency"></app-product-price>
        </div>

        <div
          id="product-images"
          (touchend)="onSwipeEnd($event)"
          (touchstart)="onSwipeStart($event)"
          class=" place-content-center  flex flex-col  overflow-hidden relative w-full  "
        >
          <div class="chevron-container z-10 w-full h-full absolute    items-center flex">
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

          <app-product-image [imagePath]="currentImage"></app-product-image>
        </div>

        <div class="order-section block 768:flex flex-col items-center justify-center  place-self-center ml-4 min-w-[320px]">
          <div id="order-options" class="bg-gray-100  flex flex-col items-center  pt-4 pb-4    768:justify-center">
            <div id="selected-options" class="flex flex-col items-center w-full ">
              <div class="flex  w-full gap-6 flex-col 320:flex-col place-items-center mb-4">
                <div
                  id="product-title"
                  class="768:flex flex-col  hidden
               items-center 1024:flex w-80 pt-3  "
                >
                  <app-product-category [category]="product.category"></app-product-category>
                  <app-product-name [name]="product.name"></app-product-name>
                </div>

                <div class="flex flex-row ">
                  <app-product-image [imagePath]="lastImage"></app-product-image>

                  <app-product-image [imagePath]="currentImage"></app-product-image>

                  <app-product-image [imagePath]="nextImage"></app-product-image>
                </div>

                <div id="product-tag-grid" class="grid grid-cols-3 gap-4 border border-gray-400 p-4 rounded">
                  <div class="text-center font-semibold uppercase">krāsa</div>
                  <div class="text-center font-semibold uppercase">Izmērs</div>
                  <div class="text-center font-semibold uppercase">Cena</div>

                  <div class="text-center">
                    <div class="text-center">
                      <span>{{ product.color_name }}</span>
                    </div>
                  </div>
                  <div class="text-center">
                    <span>{{ selectedSize }}</span>
                  </div>
                  <div class="text-center">
                    <span>{{ price }} €</span>
                  </div>
                </div>

                <div id="size-selector" class=" grid place-items-center gap-1  w-[90%]">
                  <ng-container *ngFor="let item of sizes">
                    <button
                      *ngIf="item.available"
                      (click)="selectSize(item)"
                      [ngClass]="{
                        'selected-button': selectedSize === item.size && item.available
                      }"
                      class=" border-x-2 border-y-2 768:flex-row 768:place-content-around  rounded-none  flex flex-col place-items-center justify-center h-10 w-full  border-slate-400 "
                    >
                      {{ item.size }}
                    </button>

                    <button
                      *ngIf="!item.available"
                      class="border-x-2 border-y-2 768:flex-row 768:place-content-around  rounded-none  flex flex-col place-items-center justify-center h-10 w-full  text-slate-300  border-slate-300"
                    >
                      {{ item.size }}
                    </button>
                  </ng-container>
                </div>
              </div>

              <div id="order-actions" class="order-commit-container flex flex-col pt-4 items-center w-full pb-4">
                <form name="emailForm" #emailForm="ngForm" class="flex flex-col w-[90%] max-w-[320px] 768:text-xs">
                  <label for="email" class="block text-sm 768:text-xs mb-2" [ngClass]="{'invalid-text': !emailValidated && email}">
                    <span class="text-red-600"> &nbsp;{{ validationMessage }}</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    [(ngModel)]="email"
                    name="emailInput"
                    [ngClass]="{'invalid-border': !emailValidated && email}"
                    class="border rounded py-2 px-3 mb-4"
                    placeholder="Tavs e-pasts pasūtījumu veikšanai.."
                    (input)="validateEmail(email)"
                  />

                  <label for="nickname" class="block  mb-2 text-lg text-black">
                    Visiem Rojālajiem
                    <span class="text-red-600 ">-15% ATLAIDE</span>
                  </label>
                  <input
                    id="nickname"
                    name="nickname"
                    type="text"
                    class="border rounded py-2 px-3 mb-4"
                    placeholder="Tavs Rojālais segvārds šeit.."
                  />

                  <button
                    (click)="processOrder()"
                    id="order-button"
                    [ngClass]="{'shake-animation': !emailValidated}"
                    class="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded h-20 text-3xl font-black font-serif"
                  >
                    Pasūtīt
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <app-other-products [otherProducts]="products" (productClick)="scrollToProductContainer()"></app-other-products>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      /* other */

      .product-card {
        font-family: 'Arial', sans-serif;
        background: radial-gradient(circle at center, lightgray, transparent);
        padding: 15px;
        border-radius: 5px;
        transition: transform 0.3s ease-in-out;
      }

      .product-name {
        color: gray; /* Light gray */
        font-size: 1.3em;
        margin-bottom: 10px;
        text-shadow: 0.5px 0.5px 1px pink; /* Optional: for better readability */
      }

      .product-price {
        color: #0077b6;
        font-weight: bold;
        text-shadow: 0.5px 0.5px 1px pink; /* Optional: for better readability */
      }

      .hover-effect {
        transition: all 0.3s ease-in-out;
      }

      .hover-effect:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      }

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

      .shake-animation {
        animation: shake 0.5s;
      }

      @keyframes shake {
        0% {
          transform: translateX(0);
        }
        25% {
          transform: translateX(-10px);
        }
        50% {
          transform: translateX(10px);
        }
        75% {
          transform: translateX(-10px);
        }
        100% {
          transform: translateX(0);
        }
      }

      .invalid-border {
        border-color: red;
      }
      .invalid-text {
        color: red;
      }
    `,
  ],
})
export class ProductPageComponent implements OnInit, AfterViewInit {
  @Input() product: Product = {} as Product;
  products: Product[] = [];
  sizes: Size[] = [];
  images: string[] = ['assets/dod-naudu-dauni/dod-naudu-dauni-1'];
  lastImage: string = 'assets/dod-naudu-dauni/dod-naudu-dauni-1';
  currentImage: string = 'assets/dod-naudu-dauni/dod-naudu-dauni-1';
  nextImage: string = 'assets/dod-naudu-dauni/dod-naudu-dauni-1';
  currentImageIndex: number = 0;
  selectedSize: string = '';
  price: number = 0;
  email: string = '';
  emailValidated: boolean = false;
  shakeTimeout: any;
  isShaking: boolean = false;
  validationMessage: string = '';

  swipeStart: number = 0;
  swipeEnd: number = 0;
  swipeTreshold: number = 50;
  animationState = 'default';


  async ngOnInit() {
this.products = await this.productService.getAllProducts();  
this.product = this.products[0];
}

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private productService: ProductService,
    private routeStateService: RouteStateService,
  ) {



    this.forward();
  }

  @ViewChild('productContainer', {static: false}) productContainer: ElementRef | undefined;
  ngAfterViewInit() {}

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.forward(); // Forward function to go to next image
    } else if (event.key === 'ArrowLeft') {
      this.back(); // Back function to go to previous image
    }
  }

  scrollToProductContainer() {
    const yOffset = this.el.nativeElement.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({top: yOffset, behavior: 'smooth'});
  }

  changeImage(index: number): void {
    this.currentImageIndex = index;
    this.currentImage = this.images[index];
    const imageCount = this.images.length;
    if (index === 0) {
      this.lastImage = this.images[imageCount - 1];
      this.nextImage = this.images[index + 1];
    } else if (index === imageCount - 1) {
      this.lastImage = this.images[index - 1];
      this.nextImage = this.images[0];
    } else {
      this.lastImage = this.images[index - 1];
      this.nextImage = this.images[index + 1];
    }
  }

  selectSize(item: Size) {
    this.price = item.price;
    this.selectedSize = item.size;
  }



  onSwipeStart(e: TouchEvent) {
    const touch = e.changedTouches[0];
    this.swipeStart = touch.clientX;
  }

  onSwipeEnd(e: TouchEvent) {
    if (!this.images) return;
    const touch = e.changedTouches[0];
    this.swipeEnd = touch.clientX;
    const swipe_distance = this.swipeEnd - this.swipeStart;
    const abs_swipeDistance = Math.abs(swipe_distance);
    if (swipe_distance > 0 && abs_swipeDistance > this.swipeTreshold) {
      this.forward();
    } else if (swipe_distance < 0 && abs_swipeDistance > this.swipeTreshold) {
      this.back();
    }
  }

  forward() {
    this.animationState = 'out';
    let imageCount = this.images.length;
    let forwardIndex = this.currentImageIndex + 1;
    if (forwardIndex >= imageCount) {
      forwardIndex = 0;
    }
    this.changeImage(forwardIndex);
    setTimeout(() => {
      this.animationState = 'default';
    }, 300); // Reset the state back to 'default' after 1 second
  }

  back() {
    this.animationState = 'out';
    let imageCount = this.images.length;
    let nextIndex = this.currentImageIndex - 1;
    if (nextIndex < 0) {
      nextIndex = imageCount - 1;
    }
    this.changeImage(nextIndex);
    setTimeout(() => {
      this.animationState = 'default';
    }, 300); // Reset the state back to 'default' after 1 second
  }



  validateEmail(email: string) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const trimmedEmail = email.trim();
    this.emailValidated = emailPattern.test(trimmedEmail);
    this.validationMessage = this.emailValidated ? '' : 'lūdzu ievadi derīgu e-pastu';
  }

  shakeButton(invalidEmail: boolean) {
    const buttonEl = this.el.nativeElement.querySelector('#order-button');

    if (invalidEmail && !this.isShaking) {
      this.isShaking = true;

      this.renderer.addClass(buttonEl, 'shake-animation');

      this.shakeTimeout = setTimeout(() => {
        this.renderer.removeClass(buttonEl, 'shake-animation');

        this.isShaking = false;
      }, 1000);
    }
  }

  processOrder() {
    this.validateEmail(this.email);
    this.shakeButton(!this.emailValidated);
    if (!this.emailValidated) return;
    this.routeStateService.allowNavigationToSuccess();
    this.router.navigate(['/success']);
  }
}
