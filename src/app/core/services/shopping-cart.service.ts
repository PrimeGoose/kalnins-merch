import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product, Selected, SelectedProductObject} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private itemsInCartSubject: BehaviorSubject<Selected[]> = new BehaviorSubject<Selected[]>([]);

  public selectedSubject: BehaviorSubject<Selected[]> = new BehaviorSubject<Selected[]>([]);

  constructor() {
    // Load the cart from localStorage on initialization
    const itemsInCart = this.loadCart();
    this.itemsInCartSubject.next(itemsInCart);

    // Whenever the cart items change, save to localStorage
    this.itemsInCartSubject.subscribe((items) => {
      this.saveCart(items);
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
}
