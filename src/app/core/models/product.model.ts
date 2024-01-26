import {ProductCardComponent} from '../../shared/components/product-card/product-card.component';
export type Size = {
  size: string;
  price: number;
  available: boolean;
};
export type Product = {
  sizes: Size[];
  product_id: number;
  category: string;
  name: string;
  color_hex: string;
  color_name: string;
  currency: string;
  gender: string;
  brand: string;
  description: string;
  images: string[];
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

export type SelectedProductObject = {
  name: string;
  price: number;
  currency: string;
  category: string;
  sizes: Size[];
  color_name: string;
  size: string; // Represents the selected size
  images: string[];
  previousImage: string; // URL of the previous image for navigation
  currentImage: string; // URL of the currently displayed image
  currentImageIndex: number; // Index of the currently displayed image
  nextImage: string; // URL of the next image for navigation
  product_id: number;
};
