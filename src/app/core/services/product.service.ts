import {Injectable} from '@angular/core';

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
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [];

  constructor() {
    this.fetchProductsJson();
  }

  fetchProductsJson() {
    // assets/products.json
    fetch('assets/products.json')
      .then((response) => response.json())
      .then((data) => {
        this.products.push(...data);

      });
  }
  /**
   * Get all products.
   * @returns {Array} All products
   */
  async getAllProducts(): Promise<Product[]> {
  return this.products;
  }

  /**
   * Get product by its ID.
   * @param {number} id - The product ID
   * @returns {Object|null} The product or null if not found
   */
  async getProductById(id: number): Promise<Product> {
    const essponse = await fetch('assets/products.json');
    const data = await essponse.json();
    const product = data.find((item: { id: number; }) => item.id === id);
    return product;

  }

  /**
   * Get product by its ID.
   * @param {number} id - The product ID
   */
  public productID = 0;
  storeProductID(id: number): void {
    this.productID = id;
  }

  /**
   * Get product by its ID
   * to be used in product.page.component.ts to fetch product data
   * @return {number} id - The product ID
   */
  getProductID(): number {
    return this.productID;
  }
}
