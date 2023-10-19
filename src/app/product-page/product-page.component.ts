import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Product, ProductService } from "../product.service";
@Component({
  selector: "app-product-page",
  template: `
    <!-- product container -->
    <div class="product-container  flex flex-col  justify-center mt-10 768:grid grid-cols-2">
      <!-- image section -->
      <div
        class="image-section flex flex-col w-full 768:w-[400px] 1024:w-[550px] 768:justify-between 1024:border-b 1024:border-t 768:mx-1 1024:mx-4">
        <!-- pruduct title -->
        <div id="product-title" class="flex flex-col  items-center 1024:hidden">
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

          <img [src]="currentImage" alt="Main Product Image" class="object-cover  hidden" />

          <!-- swipe container  -->
          <div
            id="images-swipe-container"
            class="flex flex-row mt-4 justify-around  flex-nowrap swipe-container overflow-hidden h-80 375:h-96 450:h-[27rem] 640:h-[42rem] 768:h-[30rem] 1024:h-[37rem]  ">
            <img
              alt="Product Thumbnail"
              *ngFor="let thumbnail of images; let i = index"
              [src]="thumbnail"
              [class.border-blue-500]="currentImageIndex === i"
              class="h-full swipable-image absolute   overflow-hidden cursor-pointer   object-cover   " />
          </div>
        </div>
      </div>

      <!-- order section -->
      <div class="order-section flex flex-col items-center justify-between ">
        <!-- pruduct title -->
        <div id="product-title" class="flex-col  hidden items-center 1024:flex 1024:w-80 1024:pt-3  ">
          <h1 class="text-2xl font-bold mb-2 flex ">{{ category }}</h1>
          <h2 class="product-name text-2xl flex ">{{ name }}</h2>
          <p class="text-lg text-gray-700 mb-2 flex ">{{ price }}</p>
        </div>

        <!-- order options -->
        <div id="order-options" class="bg-gray-100  flex flex-col items-center  pt-4 pb-4 w-full 768:w-80   768:justify-center">
          <!-- selected color preview img size -->
          <div id="selected-options" class="flex flex-col items-center">
            <!-- selected color in text  -->
            <div class="flex gap-6 flex-col 320:flex-row place-items-center mb-4">
              <p class="text-sm text-gray-600 mb-2">{{ color }}</p>
              <!-- selected preview thumbnail -->
              <img [src]="currentImage" alt="Product color preview" class="w-16 h-16 " />
            </div>
            <!-- selected size in text -->
            <p class="text-sm text-gray-600 mb-4">{{ selectedSize }}</p>
          </div>

          <!-- size selector -->
          <div
            id="size-selector"
            class=" grid place-items-center gap-1 450:grid 450:grid-cols-3 450:grid-rows-2 640:grid-cols-6 640:grid-rows-1 768:grid-cols-2 768:grid-rows-3 w-[90%]">
            <ng-container *ngFor="let item of sizes">
              <!-- ng if  -->
              <ng-container *ngIf="item.available">
                <button
                  (click)="selectSize(item)"
                  class=" border-x-2 border-y-2 border-slate-400 rounded-none flex flex-col place-items-center justify-center  h-12 w-full">
                  {{ item.size }}
                </button>
              </ng-container>

              <ng-container *ngIf="!item.available">
                <button
                  class="border-x-2 border-y-2 768:flex-row 768:place-content-around  border-slate-300 rounded-none  flex flex-col place-items-center justify-center h-12 w-full  text-slate-300">
                  {{ item.size }}
                  <icon *ngIf="!item.available" [name]="item.size" class="h-6 w-6 text-slate-900"></icon>
                </button>
              </ng-container>
            </ng-container>
          </div>
        </div>

        <!-- order actions -->
        <!-- buyer credentials -->
        <div id="order-actions" class="order-commit-container flex flex-col pt-4 items-center w-full pb-4">
          <!-- order form has email and nickname,if nickname is recognized buyer is getting 15% discount -->
          <form class="flex flex-col w-[90%] max-w-[320px] 768:text-xs">
            <!-- email label -->
            <label for="email" class="block text-sm 768:text-xs mb-2">Email: <span class="text-red-600">*</span></label>
            <!-- email input-->
            <input id="email" type="email" class="border rounded   py-2 px-3 mb-4" placeholder="Tavs e-pasts pasūtījumu veikšanai.." />
            <!-- nickname label -->
            <label for="nickname" class="block 450:text-sm 768:text-xs  mb-2 text-xs">
              Rojālā segvārds (ja ir; visiem Rojālajiem <span class="text-red-600">-15% ATLAIDE</span>)</label
            >
            <!-- nickname input -->

            <input id="nickname" type="text" class="border rounded  py-2 px-3 mb-4" placeholder="Tavs Rojālais segvārds šeit.." />
            <!-- order button places the order after email and nickname are validated -->
            <!-- on success order button goes to order summary message route -->
            <button
              (click)="processOrder()"
              id="order-button"
              class="bg-orange-400 hover:bg-orange-500 text-white  320:py-2 text-xs 320:px-4 rounded 320:h-20  h-12
               320:text-3xl font-black font-serif ">
              Pasūtīt
            </button>
          </form>
        </div>
      </div>
      <!--  -->
    </div>
  `,
  styles: [``],
})
export class ProductPageComponent implements OnInit {
  id: number = 0;
  product: Product[] = [];

  constructor(private router: Router, private productService: ProductService) {
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
      this.color = _product.color_name;
      this.sizes = _product.sizes;
      this.price = _product.sizes[0].price;
      this.selectedSize = _product.sizes[0].size;

      // this.sizes = _product.sizes

      this.images = _product.imgages;
    } else {
      // redirect to 404
      this.router.navigate(["404"]);
    }
  }
  // inputs from other components
  category: string = "";
  name: string = "";
  price: number = 0;
  color: string = "";
  selectedSize: string = "";

  sizes: { size: string; price: number; available: boolean }[] = [];
  // product images, this will come from a source, now it is just an static array of images for testing purposes
  images = ["https://placehold.co/400x496?text=1"];
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
  // swipe event handler functions

  swipeStart: number = 0;
  swipeEnd: number = 0;

  swipeTreshold: number = 50;
  onSwipeStart(e: TouchEvent) {
    console.log("swipe start");
    const touch = e.changedTouches[0];
    this.swipeStart = touch.clientX;
  }

  onSwipeEnd(e: TouchEvent) {
    const touch = e.changedTouches[0];
    this.swipeEnd = touch.clientX;
    const swipe_distance = this.swipeEnd - this.swipeStart;

    const abs_swipeDistance = Math.abs(swipe_distance);
    if (swipe_distance > 0 && abs_swipeDistance > this.swipeTreshold) {
      console.log("right");
      // Take the first element and put it at the end
      const firstElement: string = this.images.shift() as string;
      this.images.push(firstElement);
    } else if (swipe_distance < 0 && abs_swipeDistance > this.swipeTreshold) {
      console.log("left");
      // Take the last element and put it at the beginning
      const lastElement: string = this.images.pop() as string;
      this.images.unshift(lastElement);
    }
  }

  forward() {
    // Take the first element and put it at the end
    const firstElement: string = this.images.shift() as string;
    this.images.push(firstElement);
  }

  back() {
    // Take the last element and put it at the beginning
    const lastElement: string = this.images.pop() as string;
    this.images.unshift(lastElement);
  }
  email: string = "";
  validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);

    if (this.validateEmail(email) == true) {
      console.log("email is valid");
    } else {
      console.log("email is not valid");
    }
  }

  processOrder() {
    console.log("email is valid");
    // redirect to /order-placed
    this.router.navigate(["success"]);

    this.validateEmail(this.email);
  }
}
