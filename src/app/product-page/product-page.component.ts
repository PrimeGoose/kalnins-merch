import { Component, Renderer2, ElementRef, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { Product, ProductService } from "../product.service";
import { RouteStateService } from "../route-state.service";
import { trigger, state, style, animate, transition } from "@angular/animations";

@Component({
  selector: "app-product-page",
  animations: [
    trigger("fadeInOut", [
      state("default", style({ opacity: 1 })),
      state("out", style({ opacity: 0 })),
      transition("* <=> *", animate(500)),
    ]),
  ],
  template: `
    <div #productContainer class="product-container flex flex-col justify-center mt-1 768:grid grid-cols-[1fr,320px] ">
      <div class="image-section flex flex-col content-center 768:justify-center 1024:border-b 1024:border-t ">
        <!-- pruduct title -->
        <div id="product-title" class="flex flex-col  items-center 768:hidden">
          <h1 class="text-2xl font-bold mb-2">{{ category }}</h1>
          <h2 class="product-name text-2xl">{{ name }}</h2>
          <p class="text-lg text-gray-700 mb-2">{{ price }}€</p>
        </div>

        <div
          id="product-images"
          (touchend)="onSwipeEnd($event)"
          (touchstart)="onSwipeStart($event)"
          class="product-images flex flex-col  overflow-hidden relative w-full  ">
          <div class="chevron-container z-10 w-full h-full absolute    items-center flex  ">
            <div
              (click)="back()"
              class="chevron-left justify-start hidden 450:flex w-9 h-16 left-0 absolute items-center hover:bg-gradient-to-r from-neutral-50 to-transparent">
              <icon [name]="'chevron-left'" class="h-6 w-6 ml-4 text-slate-900 "></icon>
            </div>
            <div
              (click)="forward()"
              class="chevron-right justify-end w-9 h-16 right-0 absolute items-center hidden 450:flex hover:bg-gradient-to-r to-neutral-50 from-transparent">
              <icon [name]="'chevron-right'" class="h-6 w-6 mr-4 text-slate-900"></icon>
            </div>
          </div>

          <img
            alt="Product Thumbnail"
            [src]="currentImage"
            class="h-full swipable-image relative   overflow-hidden cursor-pointer   object-cover" />
        </div>
      </div>

      <div class="order-section flex flex-col items-center justify-center  place-self-center ml-4">
        <div id="order-options" class="bg-gray-100  flex flex-col items-center  pt-4 pb-4     768:justify-center">
          <div id="selected-options" class="flex flex-col items-center">
            <div class="flex  w-full gap-6 flex-col 320:flex-col place-items-center mb-4">
              <div
                id="product-title"
                class="768:flex flex-col  hidden
               items-center 1024:flex 1024:w-80 1024:pt-3  ">
                <h1 class="text-2xl font-bold mb-2 flex ">{{ category }}</h1>
                <h2 class="product-name text-2xl flex ">{{ name }}</h2>
              </div>

              <div class="flex flex-row ">
                <img
                  *ngIf="lastImage"
                  [@fadeInOut]="animationState"
                  [src]="lastImage"
                  alt="Product color preview"
                  class=" h-16"
                  (click)="forward()" />
                <img
                  [@fadeInOut]="animationState"
                  [src]="currentImage"
                  alt="Product color preview"
                  class=" h-16 border border-red-300 rounded-sm border-x-2 border-y-2 border-spacing-4" />
                <img
                  *ngIf="nextImage"
                  [@fadeInOut]="animationState"
                  [src]="nextImage"
                  alt="Product color preview"
                  class=" h-16"
                  (click)="back()" />
              </div>

              <div id="product-tag-grid" class="grid grid-cols-3 gap-4 border border-gray-400 p-4 rounded">
                <div class="text-center font-semibold uppercase">krāsa</div>
                <div class="text-center font-semibold uppercase">Izmērs</div>
                <div class="text-center font-semibold uppercase">Cena</div>

                <div class="text-center">
                  <div class="text-center">
                    <span>{{ color_name }}</span>
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
                    [ngClass]="{ 'selected-button': selectedSize === item.size && item.available }"
                    class=" border-x-2 border-y-2 768:flex-row 768:place-content-around  rounded-none  flex flex-col place-items-center justify-center h-10 w-full  border-slate-400 ">
                    {{ item.size }}
                  </button>

                  <button
                    *ngIf="!item.available"
                    class="border-x-2 border-y-2 768:flex-row 768:place-content-around  rounded-none  flex flex-col place-items-center justify-center h-10 w-full  text-slate-300  border-slate-300">
                    {{ item.size }}
                  </button>
                </ng-container>
              </div>
            </div>

            <div id="order-actions" class="order-commit-container flex flex-col pt-4 items-center w-full pb-4">
              <form name="emailForm" #emailForm="ngForm" class="flex flex-col w-[90%] max-w-[320px] 768:text-xs">
                <label for="email" class="block text-sm 768:text-xs mb-2" [ngClass]="{ 'invalid-text': !emailValidated && email }">
                  Email: <span class="text-red-600">* {{ validationMessage }}</span>
                </label>
                <input
                  id="email"
                  type="email"
                  [(ngModel)]="email"
                  name="emailInput"
                  [ngClass]="{ 'invalid-border': !emailValidated && email }"
                  class="border rounded py-2 px-3 mb-4"
                  placeholder="Tavs e-pasts pasūtījumu veikšanai.."
                  (input)="validateEmail(email)" />

                <label for="nickname" class="block 450:text-sm 768:text-xs mb-2 text-xs">
                  Rojālā segvārds (ja ir; visiem Rojālajiem <span class="text-red-600">-15% ATLAIDE</span>)
                </label>
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  class="border rounded py-2 px-3 mb-4"
                  placeholder="Tavs Rojālais segvārds šeit.." />

                <button
                  (click)="processOrder()"
                  id="order-button"
                  [ngClass]="{ 'shake-animation': !emailValidated }"
                  class="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded h-20 text-3xl font-black font-serif">
                  Pasūtīt
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 450:grid-cols-2 640:grid-cols-3 gap-4 mt-40 max-w-[1164px]">
      <div
        *ngFor="let product of otherProducts"
        class="cursor-pointer rounded overflow-hidden shadow-lg hover-effect product-card"
        (click)="getOtherProduct(product.id)">
        <img class="w-full" [src]="product.imgages[0]" alt="{{ product.name }}" />
        <div class="px-6 py-4 ">
          <div class="font-bold text-xl mb-2 product-name ">{{ product.name }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 90%;
      }
      /* other */

      .product-card {
        font-family: "Arial", sans-serif;
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
        transition: background-color 0.3s, color 0.3s, border-color 0.3s, font-size 0.3s, font-weight 0.3s, opacity 0.3s; /* transition added */
      }

      .selected-button {
        background-color: #d45d90; /* deeper shade of pink */
        color: white;
        border: 2px solid #d45d90;
        font-size: x-large;
        font-weight: bold;
        opacity: 0.9; /* slightly less than 1 for a subtle fade-in effect */
        transform: scale(1.05); /* slightly larger size for a popping effect */
        transition: background-color 0.3s, color 0.3s, border-color 0.3s, font-size 0.3s, font-weight 0.3s, opacity 0.3s, transform 0.3s; /* transition added */
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
  id: number = 0;
  product: Product[] = [];
  otherProducts: Product[] = [];
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private productService: ProductService,
    private routeStateService: RouteStateService
  ) {}

  @ViewChild("productContainer", { static: false }) productContainer: ElementRef | undefined;
  ngAfterViewInit() {}

  scrollToProductContainer() {
    const yOffset = this.el.nativeElement.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: yOffset, behavior: "smooth" });
  }

  ngOnInit(): void {
    this.otherProducts = this.productService.getAllProducts();
    this.router.url;
    const _id = this.router.url.split("/")[2];
    this.id = parseInt(_id);

    const _product = this.productService.getProductById(this.id);
    if (_product) {
      this.product = [_product];
      this.category = _product.category;
      this.name = _product.name;
      this.color_name = _product.color_name;
      this.color_hex = _product.color_hex;
      this.sizes = _product.sizes;
      this.price = _product.sizes[0].price;
      const availableSize = _product.sizes.find((item) => item.available);
      this.selectedSize = availableSize ? availableSize.size : "";

      this.images = _product.imgages;
    } else {
      this.router.navigate(["404"]);
    }
    this.forward();
  }

  getOtherProduct(id: number) {
    this.scrollToProductContainer();
    this.otherProducts = this.productService.getAllProducts();
    this.otherProducts = this.otherProducts.filter((item) => item.id !== id);
    const _product = this.productService.getProductById(id);
    if (_product) {
      this.product = [_product];
      this.category = _product.category;
      this.name = _product.name;
      this.color_name = _product.color_name;
      this.color_hex = _product.color_hex;
      this.sizes = _product.sizes;
      this.price = _product.sizes[0].price;
      const availableSize = _product.sizes.find((item) => item.available);
      this.selectedSize = availableSize ? availableSize.size : "";

      this.images = _product.imgages;
    } else {
      this.router.navigate(["404"]);
    }
    this.forward();
  }
  category: string = "";
  name: string = "";
  price: number = 0;
  color_name: string = "";
  color_hex: string = "";
  selectedSize: string = "";
  sizes: { size: string; price: number; available: boolean }[] = [];
  images: string[] = [];
  currentImage: string = this.images[0];
  lastImage: string = "";
  nextImage: string = "";
  currentImageIndex: number = 0;

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

  selectSize(item: { size: string; price: number; available: boolean }) {
    this.price = item.price;
    this.selectedSize = item.size;
  }

  swipeStart: number = 0;
  swipeEnd: number = 0;

  swipeTreshold: number = 50;
  onSwipeStart(e: TouchEvent) {
    console.log("swipe start");
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
      console.log("right");
      this.forward();
    } else if (swipe_distance < 0 && abs_swipeDistance > this.swipeTreshold) {
      console.log("left");
      this.back();
    }
  }
  animationState = "default";

  forward() {
    this.animationState = "out";

    let imageCount = this.images.length;
    let forwardIndex = this.currentImageIndex + 1;
    if (forwardIndex >= imageCount) {
      forwardIndex = 0;
    }
    this.changeImage(forwardIndex);
    setTimeout(() => {
      this.animationState = "default";
    }, 300); // Reset the state back to 'default' after 1 second
  }

  back() {
    this.animationState = "out";
    let imageCount = this.images.length;
    let nextIndex = this.currentImageIndex - 1;
    if (nextIndex < 0) {
      nextIndex = imageCount - 1;
    }
    this.changeImage(nextIndex);
    setTimeout(() => {
      this.animationState = "default";
    }, 300); // Reset the state back to 'default' after 1 second
  }

  email: string = "";
  emailValidated: boolean = false;
  shakeTimeout: any;
  isShaking: boolean = false;
  validationMessage: string = "";

  validateEmail(email: string) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const trimmedEmail = email.trim();
    this.emailValidated = emailPattern.test(trimmedEmail);
    this.validationMessage = this.emailValidated ? "" : "Invalid";
  }

  shakeButton(invalidEmail: boolean) {
    const buttonEl = this.el.nativeElement.querySelector("#order-button");

    if (invalidEmail && !this.isShaking) {
      this.isShaking = true;

      this.renderer.addClass(buttonEl, "shake-animation");

      this.shakeTimeout = setTimeout(() => {
        this.renderer.removeClass(buttonEl, "shake-animation");

        this.isShaking = false;
      }, 1000);
    }
  }

  processOrder() {
    console.log(this.email);
    this.validateEmail(this.email);
    this.shakeButton(!this.emailValidated);
    if (!this.emailValidated) return;
    this.routeStateService.allowNavigationToSuccess();
    this.router.navigate(["/success"]);
  }
}
