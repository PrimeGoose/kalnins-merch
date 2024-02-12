import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, combineLatest, map} from 'rxjs';
import {Product, Selected, SelectedProductObject} from '../models/product.model';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private itemsInCartSubject: BehaviorSubject<Selected[]> = new BehaviorSubject<Selected[]>([]);

  public selectedSubject: BehaviorSubject<Selected[]> = new BehaviorSubject<Selected[]>([]);
  public idSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0); // or any default value

  constructor(private route: ActivatedRoute) {
    // Load the cart from localStorage on initialization
    const itemsInCart = this.loadCart();
    this.itemsInCartSubject.next(itemsInCart);

    // Whenever the cart items change, save to localStorage
    this.itemsInCartSubject.subscribe((items) => {
      this.saveCart(items);
    });

    this.route.paramMap.subscribe((params) => {
      const newId = parseInt(params.get('id') ?? '0', 10);

      if (!isNaN(newId)) {
        this.idSubject.next(newId);
        this.calculateHowManyItemsInCartForEachSize();
        this.calculateSelectedCountInCart();
      } else {
        // Handle invalid 'id' (e.g., reset the BehaviorSubject or handle error)
        this.idSubject.next(0); // Reset to default or handle as needed
      }
    });
  }

  public addToCart(item: Selected) {
    const currentItems = this.itemsInCartSubject.getValue();
    const updatedItems = [...currentItems, item];
    this.itemsInCartSubject.next(updatedItems);
  }

  public removeFromCart(product_id: number, size: string) {
    const currentItems: Selected[] = this.itemsInCartSubject.getValue();

    // Find the index of the first item that matches both product_id and size
    const indexToRemove = currentItems.findIndex((item) => item.product_id === product_id && item.size === size);

    if (indexToRemove > -1) {
      // Remove only the first matching item
      currentItems.splice(indexToRemove, 1);
      this.itemsInCartSubject.next(currentItems);
    }
  }

  public removeAllFromCart(product_id: number, size: string) {
    const currentItems: Selected[] = this.itemsInCartSubject.getValue();
    const updatedItems = currentItems.filter((item) => item.product_id !== product_id || item.size !== size);
    this.itemsInCartSubject.next(updatedItems);
  }

  public getItems(): BehaviorSubject<Selected[]> {
    return this.itemsInCartSubject;
  }

  public clearCart() {
    this.itemsInCartSubject.next([]);
  }

  private loadCart(): Selected[] {
    const savedCart = localStorage.getItem('shopping_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  private saveCart(items: Selected[]) {
    localStorage.setItem('shopping_cart', JSON.stringify(items));
  }

  public updateSelected(item: SelectedProductObject) {
    const selected: Selected = {
      category: item.category,
      name: item.name,
      price: item.price,
      size: item.size,
      color_name: item.color_name,
      image: item.currentImage,
      product_id: item.product_id,
    };
    this.selectedSubject.next([selected]);
  }

  public getSelected(): Observable<Selected[]> {
    return this.selectedSubject.asObservable();
  }

  public calculateSelectedCountInCart(): Observable<number> {
    return combineLatest([this.getItems().asObservable(), this.getSelected()]).pipe(
      map(([items, selected]) => {
        const selectedProduct = selected[0];
        return items.filter((item) => item?.product_id === selectedProduct?.product_id && item?.size === selectedProduct?.size).length;
      }),
    );
  }

  public calculateHowManyItemsInCartForEachSize(): Observable<Record<string, number>> {
    return combineLatest([this.itemsInCartSubject.asObservable(), this.selectedSubject.asObservable()]).pipe(
      map(([items, selected]) => {
        const selectedProductId = selected[0]?.product_id;
        const sizeCount = {
          XS: 0,
          S: 0,
          M: 0,
          L: 0,
          XL: 0,
          XXL: 0,
          XXXL: 0,
          XXXXL: 0,
          Juris: 0,
        } as any;

        items.forEach((item) => {
          if (item.product_id === selectedProductId && sizeCount.hasOwnProperty(item.size)) {
            sizeCount[item.size]++;
          }
        });

        return sizeCount;
      }),
    );
  }
}
