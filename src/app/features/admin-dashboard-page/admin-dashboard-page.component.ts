import {CommonModule, NgFor} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule} from '@angular/forms';
import {Product, Size} from 'src/app/core/services/product.service';
import {Dimensions, ImageCroppedEvent, ImageCropperComponent, ImageCropperModule, LoadedImage, ImageTransform} from 'ngx-image-cropper';
import {DomSanitizer} from '@angular/platform-browser';
import {FormControl, Validators} from '@angular/forms';
import {AbstractControl, ValidationErrors, FormArray} from '@angular/forms';
import {SupabaseService} from 'src/app/core/services/supabase.service';
import {colors, default_sizes, categories} from './constants';
import {SupabaseClient} from '@supabase/supabase-js';
import {Observable} from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, ImageCropperModule, ReactiveFormsModule],
  selector: 'app-admin-dashboard-page',
  templateUrl: './admin-dashboard-page.component.html',
  styleUrls: ['./admin-dashboard-page.component.scss'],
})
export class AdminDashboardPageComponent implements OnInit {
  user: any;
  isManager: boolean = false;

  async ngOnInit() {
    await this.supabase.getIsStoreManager().then((isManager) => {
      this.isManager = isManager;
    });
    await this.getAllUploadedImagesTo();
    await this.getAllProductImages();
    await this.filterAvailableImages();
  }

  filteredImages: any[] = [];

  async filterAvailableImages() {
    this.all_images_from_kalnins_merch_bucket.map((image: any) => {
      if (!this.all_active_images.includes(image.url)) {
        this.filteredImages.push(image);
      }
    });
  }

  returnFilteredImagesLength() {
    return this.filteredImages.length;
  }

  colors = colors;
  categories = categories;
  default_sizes = default_sizes;

  uploadedImagePaths: string[] = [];
  all_images_from_kalnins_merch_bucket: any = [];

  async getAllUploadedImagesTo() {
    this.all_images_from_kalnins_merch_bucket = [];
    this.filteredImages = [];

    await this.supabase.supabase.storage
      .from('kalnins-merch')
      .list()
      .then(async (data) => {
        // console.log(data.data, 'ddddddd');

        data.data?.map((image: any) => {
          this.all_images_from_kalnins_merch_bucket.push({
            name: image.name,
            url: 'https://islbmwzkwwjkjvbsalcp.reysweek.com/storage/v1/object/public/kalnins-merch/' + image.name,
          });
        });
      });
  }
  all_active_images: string[] = [];

  async getAllProductImages() {
    let {data: products, error} = await this.supabase.supabase.from('products').select('images');

    if (error) {
      console.error('Error fetching products', error);
      return;
    }

    // Assuming 'images' is an array of image URLs
    this.all_active_images = products?.flatMap((product) => product.images) || [];
  }

  product: Product = {
    category: '',
    product_id: 0,
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
  selectedColor: string = '';
  selectedCategory: string = '';

  supabase_image_Paths: string[] = [];
  constructor(
    private supabase: SupabaseService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
  ) {}
  blobUrl: any;

  pForm: any = this.fb.group({
    category: ['', Validators.required],
    name: ['', Validators.required],
    color: ['', Validators.required],
    sizes: this.fb.array(
      this.product.sizes.map((size) => this.fb.group(size)),
      this.sizeValidator,
    ),
    images: [[] as string[], this.imageValidator],
  });

  selectColor(color: string) {
    this.selectedColor = color;
    // You can also update your form control value here if needed
    this.pForm.controls['color'].setValue(color);
  }
  getColorClasses(color: string): string {
    switch (color) {
      case 'melns':
        return 'bg-black';
      case 'balts':
        return 'bg-white';
      case 'sarkans':
        return 'bg-red-500';
      case 'zils':
        return 'bg-blue-500';
      case 'zaļs':
        return 'bg-green-500';
      case 'dzeltens':
        return 'bg-yellow-500';
      default:
        return '';
    }
  }

  isSelectedColor(color: string): boolean {
    return this.selectedColor === color;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    // You can also update your form control value here if needed
    this.pForm.controls['category'].setValue(category);
  }

  isSelectedCategory(category: string): boolean {
    return this.selectedCategory === category;
  }

  // upload here
  async hanfleimg(blobUrl: string) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const img: HTMLImageElement = new Image();

    img.onload = async () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Compress and upload WebP format
      const webpBlob = await this.compressImage(canvas, 'image/webp');
      await this.uploadConvertedFile(webpBlob, 'webp');
    };

    img.src = blobUrl;
  }

  async cropAndUpload() {
    // Assuming 'this.blobUrl' holds the current image to be cropped and uploaded
    if (!this.blobUrl) {
      console.error('No image selected for cropping and uploading.');
      return;
    }

    try {
      const response = await fetch(this.blobUrl);
      const blob = await response.blob();

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Failed to create canvas context');
      }

      const img = new Image();
      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Compress and upload in WebP format
        const webpBlob = await this.compressImage(canvas, 'image/webp');
        await this.uploadConvertedFile(webpBlob, 'webp');

        // Clear the blobUrl and any related memory
        this.blobUrl = '';
        this.filteredImages = [];
        this.uploadedImagePaths = [];

        // Update the UI with new images
        await this.getAllUploadedImagesTo();
        await this.getAllProductImages();
        await this.filterAvailableImages();
      };

      img.src = this.blobUrl;
    } catch (error) {
      console.error('Error during the crop and upload process:', error);
    }

    this.showCropper = false;
  }

  removeImage(index: number) {
    // remove image from product.images
    this.product.images.splice(index, 1);

    // update form control with new images array
    const imagesControl = this.pForm.get(['images']);
    if (imagesControl) {
      const imagesControl = this.pForm.get(['images']) as FormControl<string[]>;

      imagesControl.setValue(this.product.images); // Ensure a new array is set
      imagesControl.updateValueAndValidity(); // Re-validate the updated form control
    }
  }

  async deleteImageFromBucket() {
    if (!this.isSelectedImage) {
      return;
    }
    const selectdNames: any = this.uploadedImagePaths.map((path) => path.split('/').pop());

    if (selectdNames) {
      await this.supabase.supabase.storage.from('kalnins-merch').remove(selectdNames); // remove from bucket
      this.filteredImages = [];
      await this.getAllUploadedImagesTo(); // refresh images
      this.isSelectedImage = false;
    }
  }

  sizeValidator(control: AbstractControl): ValidationErrors | null {
    const sizes = (control as FormArray).controls;
    const isAvailable = sizes.some((ctrl) => ctrl.value.available);
    return isAvailable ? null : {sizeRequired: true};
  }

  get sizesControls() {
    return (this.pForm.get('sizes') as FormArray).controls;
  }

  imageValidator(control: AbstractControl): ValidationErrors | null {
    const images = control.value;
    const isValid = images && images.length > 0;
    return isValid ? null : {imageRequired: true};
  }

  // submit fn
  async onSubmit() {
    if (!this.pForm.valid) {
      console.error('Form not valid');
      return;
    }

    // Handle the images and wait for all to be uploaded
    // const images: string[] = this.pForm.value.images || [];
    try {
      // Assuming `uploadConvertedFile` is the method to upload images
      // this.uploadedImagePaths = await Promise.all(
      //   images.map(async (blobUrl) => {
      //     const response = await fetch(blobUrl);
      //     const blob = await response.blob();
      //     return this.uploadConvertedFile(blob, 'webp');
      //   }),
      // );

      // All images are uploaded at this point, and paths are collected
      // this.pForm.get('images')?.setValue(this.uploadedImagePaths);

      const saveProductResult = await this.supabase.saveProduct({
        product_id: this.product.product_id,
        category: this.pForm.value.category || '',
        name: this.pForm.value.name || '',
        color_hex: this.pForm.value.color || '',
        color_name: this.pForm.value.color || '',
        currency: this.product.currency || '',
        gender: this.product.gender || '',
        brand: this.product.brand || '',
        description: this.product.description || '',
        sizes: this.product.sizes,
        images: this.uploadedImagePaths, // Use the uploaded image paths
      });

      this.resetFormAndProduct();
    } catch (error) {
      console.error('Error during the upload or save process:', error);
    }
  }

  toggleImageSelection(image: any): void {
    const imageUrl = 'https://islbmwzkwwjkjvbsalcp.reysweek.com/storage/v1/object/public/kalnins-merch/' + image.name;

    if (this.uploadedImagePaths.includes(imageUrl)) {
      // here we remove the image from uploadedImagePaths
      this.uploadedImagePaths = this.uploadedImagePaths.filter((url) => url !== imageUrl);
      this.pForm.get('images')?.updateValueAndValidity();
    } else {
      // heer we add the image to uploadedImagePaths
      this.uploadedImagePaths.push(imageUrl);
      this.pForm.get('images')?.setErrors(null);
      console.log(this.uploadedImagePaths);
    }
    if (this.uploadedImagePaths.length > 0) {
      this.isSelectedImage = true;
    } else {
      this.isSelectedImage = false;
    }
  }

  isSelectedImage: boolean = false;
  isSelected(image: any): boolean {
    const imageUrl = 'https://islbmwzkwwjkjvbsalcp.reysweek.com/storage/v1/object/public/kalnins-merch/' + image.name;

    return this.uploadedImagePaths.includes(imageUrl);
  }

  resetFormAndProduct() {
    this.pForm.reset();
    this.product.sizes = [...this.default_sizes];
    this.pForm.get('sizes')?.setValue(this.product.sizes);
    this.product.images = [];
    this.pForm.get('images')?.setValue([]);
    this.supabase_image_Paths = [];
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

  async imageCropped(event: ImageCroppedEvent) {
    this.blobUrl = event.objectUrl || '';
  }

  async compressImage(canvas: HTMLCanvasElement, format: string): Promise<Blob> {
    let quality: number = 1; // Start with the highest quality
    let compressedBlob: Blob | null = null;

    do {
      compressedBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob((blob) => resolve(blob), format, quality));

      if (!compressedBlob) break;

      quality -= 0.1; // Decrease quality by 10%
    } while (compressedBlob.size > 128 * 1024 && quality > 0); // Check if the size is more than 128 KB

    return compressedBlob || new Blob();
  }

  async uploadConvertedFile(blob: Blob, format: string) {
    this.pForm.markAllAsTouched();
    this.pForm.get('images')?.updateValueAndValidity();
    this.pForm.get('images')?.markAsDirty();
    this.pForm.get('images')?.markAsTouched();

    const product_name = this.pForm.value.name;

    if (blob.size > 0) {
      const fileName = `compressed_image_${Date.now()}.${format}`;
      const file = new File([blob], fileName, {type: `image/${format}`});

      return this.supabase.uploadPublicImage(file, `kalnins-merch`).then((supabase_image_Path: any) => {
        const full_supabase_image_Path: string = `${supabase_image_Path.url}`;
        return full_supabase_image_Path; // This will be used in Promise.all
      });
    }
    return Promise.reject('Blob is empty');
  }

  imageLoaded() {
    this.showCropper = true;
  }

  cropperReady(sourceImageDimensions: Dimensions) {
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

  removeImageFromBucket() {
    const name = this.uploadedImagePaths[0].split('/').pop() || '';
    this.supabase.supabase.storage.from('kalnins-merch').remove([name]); // remove from bucket
    this.getAllUploadedImagesTo(); // refresh images
  }

  toggleAvailable(item: any) {
    this.pForm.markAllAsTouched();

    const sizes = this.pForm.get('sizes');
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
    this.pForm.get('sizes')?.setValue(this.product.sizes);
  }
}
