import {Injectable} from '@angular/core';
import {SupabaseService} from './supabase.service';
import {Product} from '../models/product.model';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public product$: Observable<Product[]> = this.productsSubject.asObservable();
  public dataLoaded = false;

  constructor(private db: SupabaseService) {}

  public async loadProducts(): Promise<void> {
    if (!this.dataLoaded) {
      const products = (await this.db.getAllProductsService()) as Product[];
      this.productsSubject.next(products);
      this.dataLoaded = true;
    }
  }
}
