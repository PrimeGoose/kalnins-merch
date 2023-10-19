import { Injectable } from '@angular/core';
export type Product = {
  category: string;
  name: string;
  color_hex: string;
  color_name: string;
  currency: string;
  sizes: { size: string; price: number; available :boolean}[];
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
  products: Product[] = []

  constructor() {
    this.fetchProductsJson();
  }


fetchProductsJson(){
  // assets/products.json 
  fetch('assets/products.json')
    .then(response => response.json())
    .then(data => {
      this.products.push(...data);
      console.log('Success:', data,'data?');
    })
  }
  /**
   * Get all products.
   * @returns {Array} All products
   */
  getAllProducts() {
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
   * Get products by category.
   * @param {string} category - The product category
   * @returns {Array} Products in the given category
   */
  getProductsByCategory(category:string) {
    return this.products.filter((p) => p.category === category);
  }
}
