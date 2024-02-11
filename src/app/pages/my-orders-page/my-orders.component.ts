import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {SupabaseService} from '../../core/services/supabase.service';
import {BehaviorSubject} from 'rxjs';
import {ShoppingCartService} from 'src/app/core/services/shopping-cart.service';
import {Order} from 'src/app/core/models/product.model';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {faRemove,faDeleteLeft,faTrash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FontAwesomeModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  royals: string[] = [];
  savings: string = '0';
  total: string = '0';
  faRemove = faTrash;

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
    });
    await this.setSingleItemQuantityToOrdersArray();
    // setTimeout(() => {
    //   this.savings = this.totalPrice(this.orders).savings.toString() + ' ';
    //   this.total = this.totalPrice(this.orders).total.toString();
    //   console.log('this.orders', this.orders);
    //   this, this.cdr.detectChanges();
    // }, 1000);
  }
  async setSingleItemQuantityToOrdersArray() {
    this.orders = this.orders
      .reduce((acc: any[], curr: any): any => {
        // Find an existing item in the accumulator
        const existing = acc.find((item) => item.product_id === curr.product_id && item.size === curr.size);
        if (existing) {
          // If found, increase its quantity
          existing.quantity = (existing.quantity || 1) + 1;
        } else {
          // If not found, set its quantity to 1 and add to the accumulator
          curr.quantity = 1;
          acc.push(curr);
        }
        return acc;
      }, [])
      .sort((a, b) => a.product_id - b.product_id); // Sort the array by product_id after reducing
    this.savings = this.totalPrice(this.orders).savings.toString();
    this.total = this.totalPrice(this.orders).total.toString();

    // Since this function is async, you might want to do something asynchronous here,
    // like saving the updated orders array to a database.
  }

  async removeItemFromCart(order: Order) {
    if (order.quantity == 1) return;
    this.cart.removeFromCart(order.product_id, order.size);
    await this.setSingleItemQuantityToOrdersArray();
  }
  async addToCart(order: Order) {
    this.cart.addToCart(order);
    await this.setSingleItemQuantityToOrdersArray();
  }

  // totalPrice(orders: Order[]) {
  //   let full_name = this._user.value.full_name;
  //   let savings;
  //   let royal: boolean = false;
  //   // if one of the array members incluse full_name then royal = true
  //   this.royals.forEach((royals) => {
  //     if (full_name.includes(royals)) {
  //       royal = true;
  //     }
  //   });

  //   const result = orders
  //     .reduce((acc, curr) => {
  //       const price = parseFloat(String(curr.price)); // Safely parse the price to a float
  //       return acc + (isNaN(price) ? 0 : price); // Add price if it's a valid number
  //     }, 0)
  //     .toFixed(2); // Fix to 2 decimal places and convert back to number

  //   if (royal) {
  //     // 15% discount
  //     savings = parseFloat(result) * 0.15;
  //     return {
  //       total: (parseFloat(result) * 0.85).toFixed(2),
  //       savings: savings.toFixed(2),
  //     };
  //   }
  //   return {
  //     total: result,
  //     savings: 0,
  //   };
  // }
  totalPrice(orders: Order[]) {
    let full_name = this._user.value.full_name;
    let savings;
    let royal: boolean = false;
    // Check if user's full name is in the royals array
    this.royals.forEach((royalName) => {
      if (full_name.includes(royalName)) {
        royal = true;
      }
    });

    // Adjusted to calculate total price based on quantity
    const result = orders
      .reduce((acc, curr) => {
        const price = parseFloat(String(curr.price)); // Parse the price to a float
        const quantity: number = curr.quantity || 1; // Assuming quantity is already a number, no need to parse
        return acc + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity); // Multiply price by quantity
      }, 0)
      .toFixed(2); // Fix to 2 decimal places

    if (royal) {
      // Apply a 15% discount for royals
      savings = parseFloat(result) * 0.15;
      return {
        total: (parseFloat(result) - savings).toFixed(2), // Calculate discounted total
        savings: savings.toFixed(2),
      };
    }
    return {
      total: result,
      savings: '0.00', // Ensure savings is a string formatted as a fixed decimal
    };
  }
 
  ngOnDestroy() {}
  removeItem(item: Order) {

    this.cart.removeAllFromCart(item.product_id, item.size);
    this.setSingleItemQuantityToOrdersArray();
  }
}
