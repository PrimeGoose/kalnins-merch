import {Injectable} from '@angular/core';
import {SupabaseService} from './supabase.service';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public productID = 0;

  products: Product[] = [];

  constructor(private supabaseService: SupabaseService) {}

  /**
   * Get all products.
   * @returns {Array} All products
   */
  async getAllProducts(): Promise<Product[]> {
    const response = await fetch('assets/products.json');
    return await this.supabaseService.getAllProductsService();
  }

  /**
   * Get product by its ID.
   * @param {number} id - The product ID
   * @returns {Object} The product
   */
  async getProductById(id: number): Promise<Product> {
    const response = await fetch('assets/products.json');
    const data = await response.json();
    const product = data.find((item: {id: number}) => item.id === id);
    return product;
  }

  /**
   * Get product by its ID.
   * @param {number} id - The product ID
   */
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
