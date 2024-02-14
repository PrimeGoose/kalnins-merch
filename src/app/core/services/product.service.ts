import {Injectable, OnDestroy} from '@angular/core';
import {SupabaseService, logPostgrestError} from './supabase.service';
import {Product, Size} from '../models/product.model';
import {BehaviorSubject, Observable, combineLatest, map, from} from 'rxjs';
import {ShoppingCartService} from './shopping-cart.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnDestroy {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public product$: Observable<Product[]> = this.productsSubject.asObservable();
  public dataLoaded = false;
  private readonly PRODUCTS_KEY = 'products';
  public selected_product_count: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private productSubscription: any;

  constructor(
    private db: SupabaseService,
    private shoppingCartService: ShoppingCartService,
  ) {
    this.subscribeToProductChanges();
  }

  private subscribeToProductChanges(): void {
    const products = this.db.supabase
      .channel('custom-all-channel')
      .on('postgres_changes', {event: '*', schema: 'public', table: 'products'}, (payload) => {
        console.log('Change received!', payload);
      })
      .subscribe();
  }

  public async loadProducts(): Promise<void> {
    if (!this.dataLoaded || true) {
      // Always refetch for real-time updates, consider removing dataLoaded check
      const products = (await this.getAllProductsService()) as Product[];
      this.productsSubject.next(products);
      this.dataLoaded = true;
    }
  }

  private async getAllProductsService(): Promise<Product[]> {
    const {data, error} = await this.db.supabase.from(this.PRODUCTS_KEY).select('*').order<string>('product_id');
    if (data) {
      localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(data));
    }

    if (error) {
      logPostgrestError('Error getting products: ', error);
      const cachedProducts = localStorage.getItem(this.PRODUCTS_KEY);
      if (cachedProducts) {
        console.info('Returning cached products');
        return JSON.parse(cachedProducts) as Product[];
      }
      return [];
    }

    return data;
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      // this.db.supabase.removeSubscription(this.productSubscription);
    }
  }

  // public set_selected_product_count(count: number) {
  //   this.selected_product_count.next(count);
  // }

  // public get_selected_product_count(): Observable<number> {
  //   return this.selected_product_count.asObservable();
  // }

  public get_product_sizes(ProductId: number): Observable<Size[]> {
    return combineLatest([this.productsSubject.asObservable(), this.shoppingCartService.getItems()]).pipe(
      map(([products, items]) => {
        const product = products.find((p) => p.product_id === ProductId);
        if (!product) return [];

        return product.sizes.map((size) => {
          const inCartCount = items.filter((item) => item.product_id === ProductId && item.size === size.size).length;
          // console.log({...size, in_cart: inCartCount});
          return {...size, in_cart: inCartCount};
        });
      }),
    );
  }
}
