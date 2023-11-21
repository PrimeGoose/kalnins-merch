import {CommonModule, NgFor} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule} from '@angular/forms';
import {Product, Size} from 'src/app/core/services/product.service';
import {Dimensions, ImageCroppedEvent, ImageCropperComponent, ImageCropperModule, LoadedImage, ImageTransform} from 'ngx-image-cropper';
import {DomSanitizer} from '@angular/platform-browser';
import {FormControl, Validators} from '@angular/forms';
import {AbstractControl, ValidationErrors, FormArray} from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, ImageCropperModule, ReactiveFormsModule],
  selector: 'app-admin-dashboard-page',
  templateUrl: './admin-dashboard-page.component.html',
  styleUrls: ['./admin-dashboard-page.component.css'],
})
export class AdminDashboardPageComponent {
  product: Product = {
    category: '',
    id: 0,
    name: '',
    color_name: '',
    color_hex: '',
    currency: 'EUR',
    description: '',
    sizes: [
      {
        size: 'XS',
        price: 9.99,
        available: true,
      },
      {
        size: 'S',
        price: 10.99,
        available: true,
      },
      {
        size: 'M',
        price: 11.99,
        available: true,
      },
      {
        size: 'L',
        price: 12.99,
        available: true,
      },
      {
        size: 'XL',
        price: 13.99,
        available: true,
      },
      {
        size: 'XXL',
        price: 14.99,
        available: true,
      },
      {
        size: '3XL',
        price: 15.99,
        available: true,
      },
      {
        size: '4XL',
        price: 16.99,
        available: true,
      },
      {
        size: 'Juris',
        price: 17.99,
        available: true,
      },
    ],
    gender: '',
    brand: '',
    images: [],
  };

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
  ) {}

  productForm = this.fb.group({
    category: ['', Validators.required],
    name: ['', Validators.required],
    color: ['', Validators.required],
    sizes: this.fb.array(
      this.product.sizes.map((size) => this.fb.group(size)),
      this.sizeValidator,
    ),
    images: [[], this.imageValidator],
  });

  cropAndAdd() {
    // Add the cropped image to the product images array
    this.product.images.push(this.croppedImage);

    // Update the form control with the new images array
    const imagesControl = this.productForm.get(['images']);
    if (imagesControl) {
      const imagesControl = this.productForm.get(['images']) as FormControl<string[]>;

      imagesControl.setValue(this.product.images); // Ensure a new array is set
      imagesControl.updateValueAndValidity(); // Re-validate the updated form control
    }

    this.showCropper = false;
  }

  removeImage(index: number) {
    // remove image from product.images
    this.product.images.splice(index, 1);

    // update form control with new images array
    const imagesControl = this.productForm.get(['images']);
    if (imagesControl) {
      const imagesControl = this.productForm.get(['images']) as FormControl<string[]>;

      imagesControl.setValue(this.product.images); // Ensure a new array is set
      imagesControl.updateValueAndValidity(); // Re-validate the updated form control
    }
  }

  sizeValidator(control: AbstractControl): ValidationErrors | null {
    const sizes = (control as FormArray).controls;
    const isAvailable = sizes.some((ctrl) => ctrl.value.available);
    return isAvailable ? null : {sizeRequired: true};
  }

  get sizesControls() {
    return (this.productForm.get('sizes') as FormArray).controls;
  }

  imageValidator(control: AbstractControl): ValidationErrors | null {
    const images = control.value;
    const isValid = images && images.length > 0;
    return isValid ? null : {imageRequired: true};
  }

  onSubmit() {
    this.productForm.markAllAsTouched();
    if (this.productForm.valid) {
      // Form is valid, proceed with submission logic
      console.log('Form Value:', this.productForm.value);
      // console.log('Images Control Value:', this.productForm.get('images')?.value);
    } else {
      // Form is invalid, show warnings
      console.log('Form Value:', this.productForm.value);
      console.log('Images Control Value:', this.productForm.get('images')?.value);
    }
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation?: number;
  translateH = 0;
  translateV = 0;
  scale = 1;
  aspectRatio = 1 / 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {
    translateUnit: 'px',
  };
  imageURL?: string;
  loading = false;
  allowMoveImage = false;
  hidden = false;

  cancel() {
    this.showCropper = false;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = '';
    this.loading = true;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.objectUrl || event.base64 || '';
    console.log(this.croppedImage);
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
    this.loading = false;
  }

  loadImageFailed() {
    console.error('Load image failed');
  }

  rotateLeft() {
    this.loading = true;
    setTimeout(() => {
      // Use timeout because rotating image is a heavy operation and will block the ui thread
      this.canvasRotation--;
      this.flipAfterRotate();
    });
  }

  rotateRight() {
    this.loading = true;
    setTimeout(() => {
      this.canvasRotation++;
      this.flipAfterRotate();
    });
  }

  moveLeft() {
    this.transform = {
      ...this.transform,
      translateH: ++this.translateH,
    };
  }

  moveRight() {
    this.transform = {
      ...this.transform,
      translateH: --this.translateH,
    };
  }

  moveTop() {
    this.transform = {
      ...this.transform,
      translateV: ++this.translateV,
    };
  }

  moveBottom() {
    this.transform = {
      ...this.transform,
      translateV: --this.translateV,
    };
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH,
    };
    this.translateH = 0;
    this.translateV = 0;
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {
      translateUnit: 'px',
    };
  }

  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation,
    };
  }

  toggleAspectRatio() {
    if (this.aspectRatio === 1 / 1) {
      this.aspectRatio = 16 / 9;
    } else if (this.aspectRatio === 16 / 9) {
      this.aspectRatio = 9 / 16;
    } else {
      this.aspectRatio = 1 / 1;
    }
  }

  getImagesAriaLabel(): string {
    const imagesCount = this.product.images.length;
    if (imagesCount === 0) {
      return 'No images selected. Click to add images.';
    } else {
      return `${imagesCount} image${imagesCount > 1 ? 's' : ''} selected. Click to change.`;
    }
  }

  onFileChange(event: any) {
    this.imageChangedEvent = event;
    this.showCropper = true;
    this.getImagesAriaLabel();
  }

  formatPrice(item: any) {
    const value = parseFloat(item.price);
    if (!isNaN(value) && value >= 0) {
      // If the value is a number and non-negative, format to two decimal places
      item.price = value.toFixed(2);
    } else {
      // If the value is not a number or negative, set price to '0.00' and available to false
      item.price = '100.00';
      item.available = false;
    }
  }

  toggleAvailable(item: any) {
    this.productForm.markAllAsTouched();

    const sizes = this.productForm.get('sizes');
    if (sizes) {
      sizes.updateValueAndValidity();
      // replace the item in product.sizes with item
      const index = this.product.sizes.findIndex((size) => size.size === item.size);
      if (index >= 0) {
        this.product.sizes[index] = item;
      }
      // update product form values
    }
    item.available = !item.available;
    if (!item.available) {
    }
    this.productForm.get('sizes')?.setValue(this.product.sizes);
  }
}
