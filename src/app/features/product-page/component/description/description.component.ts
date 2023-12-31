import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription, switchMap} from 'rxjs';
import {SupabaseService} from 'src/app/core/services/supabase.service';

@Component({
  selector: 'app-description',
  template: `
    <!-- Product Description -->
    <div class="bg-[#F7F7F7] p-6 rounded-lg shadow-sm w-full">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Product Description</h2>
      <p class="text-gray-600 mb-4">
        {{ description | json }}
      </p>
    </div>
  `,
  styles: [],
})
export class DescriptionComponent implements OnInit {
  id: any = 0;
  description = '';
  routeSubscription: Subscription | undefined;

  constructor(
    private db: SupabaseService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.params
      .pipe(
        switchMap((params) => {
          this.id = params['id'];
          return this.getDescriptionById(this.id);
        }),
      )
      .subscribe((description) => {
        this.description = description;
      });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  async getDescriptionById(id: any): Promise<any> {
    const {data, error} = await this.db.supabase.from('products').select('description, product_id').eq('product_id', id);
    if (error) {
      console.error(error);
      return '';
    }
    return data[0].description;
  }
}
