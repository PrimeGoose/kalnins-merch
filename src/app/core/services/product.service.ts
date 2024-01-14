import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {SupabaseService} from './supabase.service';
import {Product} from '../models/product.model';

// product.service.ts
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: SupabaseService) {}

  public async loadProducts(): Promise<Product[]> {
    return (await this.db.getAllProductsService()) as Product[];
  }
}
