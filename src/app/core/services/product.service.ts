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

  async getAllProducts(): Promise<Product[]> {
    return await this.supabaseService.getAllProductsService();
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.supabaseService.getProductByIDService(id);
    return product;
  }
}
