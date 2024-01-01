// product.service.ts
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {SupabaseService} from './supabase.service';
import {loadProducts, loadProductsSuccess} from '../../state/products/actions/product.actions';
import {Product} from '../models/product.model';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private db: SupabaseService,
    private store: Store,
  ) {}

  public async loadProducts() {
    const items: Product[] = await this.db.getAllProductsService();
    console.log(items);
    this.store.dispatch(loadProductsSuccess({items}));
    return items;
  }
}
