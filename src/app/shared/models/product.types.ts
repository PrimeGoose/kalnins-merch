export type Size = {
  size: string;
  price: number;
  available: boolean;
};
export type Product = {
  sizes: Size[];
  id: number;
  category: string;
  name: string;
  color_hex: string;
  color_name: string;
  currency: string;
  gender: string;
  brand: string;
  images: string[];
};
