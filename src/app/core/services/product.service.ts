import {Injectable} from '@angular/core';
import {SupabaseService} from './supabase.service';
import {Product, Size} from '../models/product.model';
import {BehaviorSubject, Observable, combineLatest, map} from 'rxjs';
import {ShoppingCartService} from './shopping-cart.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public product$: Observable<Product[]> = this.productsSubject.asObservable();
  public dataLoaded = false;

  public selected_product_count: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private db: SupabaseService,
    private shoppingCartService: ShoppingCartService,
  ) {}

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

  public get_product_sizes(ProductId: number): Observable<Size[]> {
    return combineLatest([this.productsSubject.asObservable(), this.shoppingCartService.getItems()]).pipe(
      map(([products, items]) => {
        const product = products.find((p) => p.product_id === ProductId);
        if (!product) return [];

        return product.variants.map((size) => {
          const inCartCount = items.filter((item) => item.product_id === ProductId && item.size === size.size).length;
          // console.log({...size, in_cart: inCartCount});
          return {...size, in_cart: inCartCount};
        });
      }),
    );
  }
}
