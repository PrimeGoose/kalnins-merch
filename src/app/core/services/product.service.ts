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
  imgages: string[];
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
   async getAllProducts():Promise<Product[]> {
    return this.products 
  }

  /**
   * Get product by its ID.
   * @param {number} id - The product ID
   * @returns {Object|null} The product or null if not found
   */
  async getProductById(id: number): Promise<Product> {

    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      return {
        id: 0,
        name: 'Not found',
        category: '',
        color_hex: '',
        color_name: '',
        sizes: [{size: '', price: 0, available: false}], 
        currency: '',
        gender  : '',
        brand: '',
        imgages: ['assets/dod-naudu-dauni/dod-naudu-dauni-1'],


      }
    }

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
