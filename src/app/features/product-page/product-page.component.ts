import {Component, Renderer2, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Product, Size, ProductService} from '../../core/services/product.service';

import {RouteStateService} from '../../route-state.service';
import {trigger, state, style, animate, transition} from '@angular/animations';

import { Subject } from 'rxjs';


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
          <app-product-category [category]="selected.category"></app-product-category>
          <app-product-name [name]="selected.name"></app-product-name>
          <app-product-price [price]="selected.price" [currency]="selected.currency"></app-product-price>
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

          <app-product-image [imagePath]="selected.currentImage"></app-product-image>
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
                  <app-product-category [category]="selected.category"></app-product-category>
                  <app-product-name [name]="selected.name"></app-product-name>
                </div>

                <div class="flex flex-row ">
                  <app-product-image (click)="back()" [imagePath]="selected.previousImage"></app-product-image>

                  <app-product-image [imagePath]="selected.currentImage"></app-product-image>

                  <app-product-image (click)="forward()" [imagePath]="selected.nextImage"></app-product-image>
                </div>

                <div id="product-tag-grid" class="grid grid-cols-3 gap-4 border border-gray-400 p-4 rounded">
                  <div class="text-center font-semibold uppercase">krāsa</div>
                  <div class="text-center font-semibold uppercase">Izmērs</div>
                  <div class="text-center font-semibold uppercase">Cena</div>

                  <div class="text-center">
                    <div class="text-center">
                      <span>{{ selected.color_name }}</span>
                    </div>
                  </div>
                  <div class="text-center">
                    <span>{{ selected.size }}</span>
                  </div>
                  <div class="text-center">
                    <span>{{ selected.price }} €</span>
                  </div>
                </div>

                <div id="size-selector" class=" grid place-items-center gap-1  w-[90%]">
                  <ng-container *ngFor="let item of selected.sizes">
                    <button
                      *ngIf="item.available"
                      (click)="selectSize(item)"
                      [ngClass]="{
                        'selected-button': selected.size === item.size && item.available
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
                  <label
                    for="email"
                    class="block text-sm 768:text-xs mb-2"
                    [ngClass]="{'invalid-text': !user.emailValidated && user.email}"
                  >
                    <span class="text-red-600"> &nbsp;{{ user.validationMessage }}</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    [(ngModel)]="user.email"
                    name="emailInput"
                    [ngClass]="{'invalid-border': !user.emailValidated && user.email}"
                    class="border rounded py-2 px-3 mb-4"
                    placeholder="Tavs e-pasts pasūtījumu veikšanai.."
                    (input)="validateEmail(user.email)"
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
                    [ngClass]="{'shake-animation': !user.emailValidated}"
                    class="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded h-20 text-3xl font-black font-serif"
                  >
                    Pasūtīt
                  </button>
                </form>
                -
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <app-other-products [otherProducts]="products" (productClick)="scrollToProductContainer($event)"></app-other-products>
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
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private productService: ProductService,
    private routeStateService: RouteStateService,
  ) {}

  @Input() id = 0;
  @Input() products: Product[] = [];

  product: Product = {} as Product;

  private productClickSubject = new Subject<number>(); //

  selected = {
    name: '',
    price: 0,
    currency: '',
    category: '',
    sizes: [] as Size[],
    color_name: '',

    size: '',
    images: [] as string[],
    previousImage: '',
    currentImage: '',
    currentImageIndex: 0,
    nextImage: '',
  };

  private initializeProduct(product: Product) {
    this.product = product;
    this.selected = {
      name: product.name || 'ss',
      price: product.sizes[0].price,
      size: product.sizes[0].size,
      images: product.images,
      currentImageIndex: 0,
      currentImage: product.images[0] || '',
      nextImage: product.images[1] || '', // Check for the next image or default to empty string
      previousImage: product.images[product.images.length - 1] || '', // Check for the previous image or default to empty string
      sizes: product.sizes,
      currency: product.currency,
      category: product.category,
      color_name: product.color_name,
    };
  }

  user = {
    email: '',
    nickname: '',
    emailValidated: false,
    validationMessage: '',
  };

  swipe = {
    start: 0,
    end: 0,
    treshold: 50,
  };

  animation: {state: string; isShaking: boolean; shakeTimeout: number} = {
    state: 'default',
    isShaking: false,
    shakeTimeout: 300,
  };
  ngOnInit() {
    this.productService.getAllProducts().then((products) => {
      if (products && products.length > 0) {
        this.initializeProduct(products[0]);
      }
    }).catch((error) => {
      // Handle any errors here
    });
  
    // Listen for product selection changes
    this.productClickSubject.subscribe({
      next: (productId: number) => {
        const product = this.products.find(p => p.id === productId);
        if (product) {
          this.initializeProduct(product);
        }
      }
    });
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

  scrollToProductContainer(id: number) {
    this.productClickSubject.next(id);
    const productElement = document.getElementById(`product-${id}`); // Ensure your product elements have corresponding ids
    const yOffset = productElement ? productElement.getBoundingClientRect().top + window.scrollY : 0;
    window.scrollTo({top: yOffset, behavior: 'smooth'});
    this.product = this.products.find((p) => p.id === id) || this.product;
  }

  changeImage(index: number): void {
    // First, check if there are products and the first product has images.
    if (!this.products.length || !this.products[0].images) return;

    // Use this.products[0] instead of this.product[0] because this.products is the array.
    let images = this.products[0].images;
    let imageCount = images.length;

    // Ensure the index is within the bounds of the images array.
    if (index < 0 || index >= imageCount) return;

    // Set the current image based on the provided index.
    this.selected.currentImageIndex = index;
    this.selected.currentImage = images[index];

    // Adjust the previous and next images based on the current index.
    this.selected.previousImage = index === 0 ? images[imageCount - 1] : images[index - 1];
    this.selected.nextImage = index === imageCount - 1 ? images[0] : images[index + 1];
  }

  selectSize(item: Size) {
    this.selected.size = item.size;
    this.selected.price = item.price;
  }

  onSwipeStart(e: TouchEvent) {
    const touch = e.changedTouches[0];
    this.swipe.start = touch.clientX;
  }

  onSwipeEnd(e: TouchEvent) {
    const touch = e.changedTouches[0];
    this.swipe.end = touch.clientX;
    const swipe_distance = this.swipe.end - this.swipe.start;
    const abs_swipeDistance = Math.abs(swipe_distance);
    if (swipe_distance > 0 && abs_swipeDistance > this.swipe.treshold) {
      this.forward();
    } else if (swipe_distance < 0 && abs_swipeDistance > this.swipe.treshold) {
      this.back();
    }
  }

  forward() {
    this.animation.state = 'out';
    // Ensure there's at least one product and it has images.
    if (!this.products.length || !this.products[0].images) return;
    let imageCount = this.products[0].images.length; // Corrected to this.products[0]
    let forwardIndex = this.selected.currentImageIndex + 1;
    if (forwardIndex >= imageCount) {
      forwardIndex = 0; // If it exceeds the array length, loop back to the first image.
    }
    this.changeImage(forwardIndex);
    setTimeout(() => {
      this.animation.state = 'default';
    }, 300); // Reset the animation state after the transition.
  }

  back() {
    this.animation.state = 'out';

    // Ensure that there are products and images available to go back through.
    if (!this.products.length || !this.products[0].images) return;
    let imageCount = this.products[0].images.length; // Corrected to this.products[0]

    // Calculate the index for the previous image.
    let nextIndex = this.selected.currentImageIndex - 1;
    if (nextIndex < 0) {
      nextIndex = imageCount - 1; // If it goes below 0, loop to the last image.
    }
    this.changeImage(nextIndex);

    // Reset the animation state after a short delay to allow for the 'out' animation to play.
    setTimeout(() => {
      this.animation.state = 'default';
    }, 300);
  }

  validateEmail(email: string) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const trimmedEmail = email.trim();
    this.user.emailValidated = emailPattern.test(trimmedEmail);
    this.user.validationMessage = this.user.emailValidated ? '' : 'lūdzu ievadi derīgu e-pastu';
  }

  shakeButton(invalidEmail: boolean) {
    const buttonEl = this.el.nativeElement.querySelector('#order-button');
    if (invalidEmail && !this.animation.isShaking) {
      this.animation.isShaking = true;
      this.renderer.addClass(buttonEl, 'shake-animation');
      this.animation.shakeTimeout = setTimeout(() => {
        this.renderer.removeClass(buttonEl, 'shake-animation');
        this.animation.isShaking = false;
      }, 1000);
    }
  }

  processOrder() {
    this.validateEmail(this.user.email);
    this.shakeButton(!this.user.emailValidated);
    if (!this.user.emailValidated) return;
    this.routeStateService.allowNavigationToSuccess();
    this.router.navigate(['/success']);
  }
}
