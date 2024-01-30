import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {SupabaseService} from '../../core/services/supabase.service';
import {BehaviorSubject} from 'rxjs';
import {ShoppingCartService} from 'src/app/core/services/shopping-cart.service';
import {Order} from 'src/app/core/models/product.model';
import {RouterModule} from '@angular/router';
@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  royals: string[] = [];

  private _user = new BehaviorSubject<any>({});
  user$ = this._user.asObservable();
  constructor(
    private db: SupabaseService,
    private cart: ShoppingCartService,
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit() {
    this.royals = await this.db.getRoyals();

    await this.db.supabase.auth.getUser().then((data: any) => {
      this._user.next(data?.data?.user?.user_metadata);
    });

    this.cart.getItems().subscribe((items) => {
      this.orders = items;
      // console.log(items);
    });
  }

  totalPrice(orders: Order[], royal: boolean) {
    let savings;
    const result = orders
      .reduce((acc, curr) => {
        const price = parseFloat(String(curr.price)); // Safely parse the price to a float
        return acc + (isNaN(price) ? 0 : price); // Add price if it's a valid number
      }, 0)
      .toFixed(2); // Fix to 2 decimal places and convert back to number

    if (royal) {
      // 15% discount
      savings = parseFloat(result) * 0.15;
      return {
        total: (parseFloat(result) * 0.85).toFixed(2),
        savings: savings.toFixed(2),
      };
    }
    return {
      total: result,
      savings: 0,
    };
  }

  ngOnDestroy() {}
  removeItem(item: any) {
    this.cart.removeFromCart(item.product_id, item.size);
  }
}
