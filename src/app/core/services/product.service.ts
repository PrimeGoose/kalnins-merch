import { Injectable } from "@angular/core";

export type Size = {
  size: string;
  price: number;
  available: boolean;
};
export type Product = {
  category: string;
  name: string;
  color_hex: string;
  color_name: string;
  currency: string;
  sizes: Size[];
  id: number;

  gender: string;
  brand: string;
  imgages: string[];
  available?: boolean;
  preorder?: boolean;
  description?: string;
  rating?: number;
  reviews?: number;
  material?: string;
};
@Injectable({
  providedIn: "root",
})
export class ProductService {
  products: Product[] = [];

  constructor() {
    this.fetchProductsJson();
  }

  fetchProductsJson() {
    // assets/products.json
    fetch("assets/products.json")
      .then((response) => response.json())
      .then((data) => {
        this.products.push(...data);
      });
  }
  /**
   * Get all products.
   * @returns {Array} All products
   */
  getAllProducts(): Product[] {
    return this.products;
  }

  /**
   * Get product by its ID.
   * @param {number} id - The product ID
   * @returns {Object|null} The product or null if not found
   */
  getProductById(id: number) {
    const product = this.products.find((p) => p.id === id);
    return product ? product : null;
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
