import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {SupabaseService} from '../../core/services/supabase.service';
import {BehaviorSubject} from 'rxjs';
@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  orders: any = [];
  private _user = new BehaviorSubject<any>({});
  user$ = this._user.asObservable();
  constructor(private db: SupabaseService) {}

  async ngOnInit() {
    await this.db.supabase.auth.getUser().then((data: any) => {
      this._user.next(data.data.user.user_metadata);
    });

    //
    const {data, error} = await this.db.supabase.from('orders').select('*');
  }

  ngOnDestroy() {}
}
