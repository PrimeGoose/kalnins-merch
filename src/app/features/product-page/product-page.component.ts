import {Component, Renderer2, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Product, Size, ProductService} from '../../core/services/product.service';

import {RouteStateService} from '../../route-state.service';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {SupabaseService} from 'src/app/core/services/supabase.service';

@Component({
  selector: 'app-product-page',
  animations: [
    trigger('fadeInOut', [state('default', style({opacity: 1})), state('out', style({opacity: 0})), transition('* <=> *', animate(500))]),
  ],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit, AfterViewInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private productService: ProductService,
    private routeStateService: RouteStateService,
    private supabaee: SupabaseService,

  
  ) {
// get id from router url 
    this.id = parseInt(this.router.url.split('/')[2]);
  }

  id:number = 0;
  @Input() products: Product[] = [];

  product: Product = {} as Product;
  otherProducts: Product[] = [];

  selected = {
    name: 'ss',
    price: 20,
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
    const hasSizes = product.sizes && product.sizes.length > 0;
    const hasImages = product.images && product.images.length > 0;

    this.selected = {
      name: product.name || '',
      price: hasSizes ? product.sizes[0].price : 0,
      size: hasSizes ? product.sizes[0].size : '',
      images: hasImages ? product.images : [],
      currentImageIndex: 0,
      currentImage: hasImages ? product.images[0] : '',
      nextImage: hasImages && product.images.length > 1 ? product.images[1] : product.images[0],
      previousImage: hasImages ? product.images[product.images.length - 1] : product.images[0],
      sizes: product.sizes || [],
      currency: product.currency || '',
      category: product.category || '',
      color_name: product.color_name || '',
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

  async ngOnInit() {
    this.otherProducts = await this.supabaee.getProducts();
    
    console.log(this.id, 'id');
    const product = await this.supabaee.getProduct(this.id);
    this.initializeProduct(product);
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

  async scrollToProductContainer(id: number) {
    this.product = {} as Product;
    this.id = id;

    const productElement = document.getElementById(`product-${id}`); // Ensure your product elements have corresponding ids
    const yOffset = productElement ? productElement.getBoundingClientRect().top + window.scrollY : 0;
    window.scrollTo({top: yOffset, behavior: 'smooth'});

    const product = await this.supabaee.getProduct(this.id);
    this.initializeProduct(product);
    console.log(this.product, 'product');
    console.log(this.selected, 'selected');
  }

  changeImage(index: number): void {
    // First, check if there are products and the first product has images.
    if (!this.product || !this.product.images) return;

    // Use this.products[0] instead of this.product[0] because this.products is the array.
    let images = this.product.images;
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

  swipeStart(e: TouchEvent) {
    const touch = e.changedTouches[0];
    this.swipe.start = touch.clientX;
  }

  swipeEnd(e: TouchEvent) {
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

  onForwardClick() {
    this.forward();
  }
  forward() {
    this.animation.state = 'out';
    // Ensure there's at least one product and it has images.
    if (!this.product || !this.product.images) return;
    let imageCount = this.product.images.length; // Corrected to this.products[0]
    let forwardIndex = this.selected.currentImageIndex + 1;
    if (forwardIndex >= imageCount) {
      forwardIndex = 0; // If it exceeds the array length, loop back to the first image.
    }
    this.changeImage(forwardIndex);
    setTimeout(() => {
      this.animation.state = 'default';
    }, 300); // Reset the animation state after the transition.
  }

  onBackClick() {
    this.back();
  }
  back() {
    this.animation.state = 'out';

    // Ensure that there are products and images available to go back through.
    if (!this.product || !this.product.images) return;
    let imageCount = this.product.images.length; // Corrected to this.products[0]

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
      this.animation.shakeTimeout = 1000;

      setTimeout(() => {
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
