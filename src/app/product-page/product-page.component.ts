import { Component, Renderer2, ElementRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Product, ProductService } from "../product.service";
import { RouteStateService } from "../route-state.service";

@Component({
  selector: "app-product-page",
  template: `
    <!-- product container -->
    <div class="product-container  flex flex-col  justify-center mt-10 768:grid grid-cols-2">
      <!-- image section -->
      <div
        class="image-section flex flex-col content-center w-full 768:w-[400px] 1024:w-[550px] 768:justify-center 1024:border-b 1024:border-t 768:mx-1 1024:mx-4">
        <!-- pruduct title -->
        <div id="product-title" class="flex flex-col  items-center 768:hidden">
          <h1 class="text-2xl font-bold mb-2">{{ category }}</h1>
          <h2 class="product-name text-2xl">{{ name }}</h2>
          <p class="text-lg text-gray-700 mb-2">{{ price }}</p>
        </div>

        <!-- // images container -->
        <div
          id="product-images"
          (touchend)="onSwipeEnd($event)"
          (touchstart)="onSwipeStart($event)"
          class="product-images flex flex-col  overflow-hidden relative w-full  ">
          <!-- chevrons for above sm -->
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

      <!-- order section -->
      <div class="order-section flex flex-col items-center justify-between ">
        <!-- order options -->

        <div id="order-options" class="bg-gray-100  flex flex-col items-center  pt-4 pb-4 w-full 768:w-80   768:justify-center">
          <!-- selected color preview img size -->
          <div id="selected-options" class="flex flex-col items-center">
            <!-- selected color in text  -->
            <div class="flex  w-full gap-6 flex-col 320:flex-col place-items-center mb-4">
              <!-- pruduct title -->
              <div
                id="product-title"
                class="768:flex flex-col  hidden
               items-center 1024:flex 1024:w-80 1024:pt-3  ">
                <h1 class="text-2xl font-bold mb-2 flex ">{{ category }}</h1>
                <h2 class="product-name text-2xl flex ">{{ name }}</h2>
              </div>

              <!-- product tag -->
              <img [src]="currentImage" alt="Product color preview" class="w-16 h-16" />
              <!-- product-tag-grid.component.html -->
              <div id="product-tag-grid" class="grid grid-cols-3 gap-4 border border-gray-400 p-4 rounded">
                <!-- Column Headers -->
                <div class="text-center font-semibold uppercase">color</div>
                <div class="text-center font-semibold uppercase">Size</div>
                <div class="text-center font-semibold uppercase">Price</div>

                <!-- Product Details -->
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

              <!-- size selector -->
              <div id="size-selector" class=" grid place-items-center gap-1  w-[90%]">
                <ng-container *ngFor="let item of sizes">
                  <!-- ng if  -->
                  <button
                    *ngIf="item.available"
                    (click)="selectSize(item)"
                    [ngClass]="{ 'selected-button': selectedSize === item.size }"
                    class=" border-x-2 border-y-2 768:flex-row 768:place-content-around  rounded-none  flex flex-col place-items-center justify-center h-10 w-full  border-slate-400 ">
                    {{ item.size }}
                  </button>

                  <button
                    *ngIf="!item.available"
                    class="border-x-2 border-y-2 768:flex-row 768:place-content-around  rounded-none  flex flex-col place-items-center justify-center h-10 w-full  text-slate-300  border-slate-300">
                    {{ item.size }}
                    <!-- <icon *ngIf="!item.available" [name]="'envelope-open'" class="h-6 w-6 text-slate-900"></icon> -->
                  </button>
                </ng-container>
              </div>
            </div>

            <!-- order actions -->
            <!-- buyer credentials -->

            <!-- order-actions.component.html -->

            <div id="order-actions" class="order-commit-container flex flex-col pt-4 items-center w-full pb-4">
              <!-- order form has email and nickname, if nickname is recognized buyer is getting 15% discount -->
              <form name="emailForm" #emailForm="ngForm" class="flex flex-col w-[90%] max-w-[320px] 768:text-xs">
                <label for="email" class="block text-sm 768:text-xs mb-2" [ngClass]="{ 'invalid-text': !emailValidated && email }">
                  Email: <span class="text-red-600">* {{ validationMessage }}</span>
                </label>
                <!-- email input -->
                <input
                  id="email"
                  type="email"
                  [(ngModel)]="email"
                  name="emailInput"
                  [ngClass]="{ 'invalid-border': !emailValidated && email }"
                  class="border rounded py-2 px-3 mb-4"
                  placeholder="Tavs e-pasts pasūtījumu veikšanai.."
                  (input)="validateEmail(email)" />
                <!-- <span class="text-sm invalid-text">{{ validationMessage }}</span> -->

                <!-- nickname label -->
                <label for="nickname" class="block 450:text-sm 768:text-xs mb-2 text-xs">
                  Rojālā segvārds (ja ir; visiem Rojālajiem <span class="text-red-600">-15% ATLAIDE</span>)
                </label>
                <!-- nickname input -->
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  class="border rounded py-2 px-3 mb-4"
                  placeholder="Tavs Rojālais segvārds šeit.." />

                <!-- order button -->
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
          <!--  -->
        </div>
      </div>
    </div>
  `,
  styles: [
    `

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
export class ProductPageComponent implements OnInit {
  id: number = 0;
  product: Product[] = [];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private productService: ProductService,
    private routeStateService: RouteStateService
  ) {
    // ge id from route params and get product by id
  }
  ngOnInit(): void {
    // ge id from route params and get product by id
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
      this.selectedSize = _product.sizes[0].size;

      // this.sizes = _product.sizes

      this.images = _product.imgages;
    } else {
      // redirect to 404
      this.router.navigate(["404"]);
    }
    this.forward();
  }
  // inputs from other components
  category: string = "";
  name: string = "";
  price: number = 0;
  color_name: string = "";
  color_hex: string = "";
  selectedSize: string = "";
  sizes: { size: string; price: number; available: boolean }[] = [];
  // product images, this will come from a source, now it is just an static array of images for testing purposes
  images: string[] = [];
  // current image is the image that is displayed in the main image container
  currentImage: string = this.images[0];
  // current image index is the index of the current image in the images array
  currentImageIndex: number = 0;

  /**
   * Change the main product image based on thumbnail selection.
   * @param {number} index - The index of the thumbnail to display.
   */
  changeImage(index: number): void {
    this.currentImageIndex = index;
    this.currentImage = this.images[index];
  }

  selectSize(item: { size: string; price: number; available: boolean }) {
    this.price = item.price;
    this.selectedSize = item.size;
  }

  // swipe events
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

  forward() {
    let imageCount = this.images.length;
    let nextIndex = this.currentImageIndex + 1;
    if (nextIndex >= imageCount) {
      nextIndex = 0;
    }
    this.changeImage(nextIndex);
  }

  back() {
    let imageCount = this.images.length;
    let nextIndex = this.currentImageIndex - 1;
    if (nextIndex < 0) {
      nextIndex = imageCount - 1;
    }
    this.changeImage(nextIndex);
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
      // Mark the button as currently shaking
      this.isShaking = true;

      this.renderer.addClass(buttonEl, "shake-animation");

      // Remove the shake class after the animation is done to reset it
      this.shakeTimeout = setTimeout(() => {
        this.renderer.removeClass(buttonEl, "shake-animation");

        // Mark the button as no longer shaking
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
