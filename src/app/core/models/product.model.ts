import {ProductCardComponent} from '../../shared/components/product-card/product-card.component';
export type Size = {
  size: string;
  price: number;
  available: boolean;
  in_cart?: number;
};

export type ProductVariant = {
  size: string;
  price: number;
  available: boolean;
  in_cart?: number;
};

export type Product = {
  product_id: number;
  name: string;
  category: string;
  brand: string;
  variants: ProductVariant[];
  color_hex: string;
  color_name: string;
  currency: string;
  gender: string;
  description: string;
  images: string[];
};

export type SelectedProductObject = {
  name: string;
  price: number;
  currency: string;
  category: string;
  variants: ProductVariant[];
  color_name: string;
  size: string; // Represents the selected size
  images: string[];
  previousImage: string; // URL of the previous image for navigation
  currentImage: string; // URL of the currently displayed image
  currentImageIndex: number; // Index of the currently displayed image
  nextImage: string; // URL of the next image for navigation
  product_id: number;
};

export type Selected = {
  category: string;
  name: string;
  price: number;
  size: string;
  color_name: string;
  image: string;
  product_id: number;
};
