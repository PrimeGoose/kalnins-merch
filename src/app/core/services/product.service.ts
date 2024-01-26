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

  public selected_product_count :BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private db: SupabaseService) {}

  public async loadProducts(): Promise<void> {
    if (!this.dataLoaded) {
      const products = (await this.db.getAllProductsService()) as Product[];
      this.productsSubject.next(products);
      this.dataLoaded = true;
    }
  }

  public set_selected_product_count(count: number) { 
    this.selected_product_count.next(count);
  }

  public get_selected_product_count(): Observable<number> {
    return this.selected_product_count.asObservable();
  } 
  



    
  


}
