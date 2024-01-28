import {Injectable} from '@angular/core';
import {SupabaseService} from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private db: SupabaseService) {}

  /*  this is the reviews table in supabase
create table
  public.reviews (
    review_id serial,
    product_id integer null,
    rating integer null,
    comment text null,
    review_date timestamp without time zone null default current_timestamp,
    active boolean not null default false,
    data jsonb null default '{}'::jsonb,
    user_id uuid null,
    constraint reviews_pkey primary key (review_id),
    constraint reviews_product_id_fkey foreign key (product_id) references products (product_id),
    constraint reviews_user_id_fkey foreign key (user_id) references users (id),
    constraint reviews_rating_check check (
      (
        (rating >= 1)
        and (rating <= 5)
      )
    )
  ) tablespace pg_default;

*/
  async getAllReviewsBy(id: number) {
    const {data, error} = await this.db.supabase.from('reviews').select('*').eq('product_id', id);
    if (error) {
      return [];
    } else {
      return data;
    }
  }

  async getReviewBy(id: number) {
    const {data, error} = await this.db.supabase.from('reviews').select('*').eq('product_id', id);
    // console.log(data);
    return data;
  }

  async editReviewBy(id: number, review: any) {
    const {data, error} = await this.db.supabase
      .from('reviews')
      .update({
        rating: review.rating,
        comment: review.comment,
        active: true,
        data: review.data,
      })
      .eq('review_id', id);
  }

  async addReviewBy(review: any) {
    const {data, error} = await this.db.supabase.from('reviews').insert({
      product_id: review.productId,
      comment: review.comment,
      rating: review.rating,
      user_id: review.user_id,
      active: true,
      data: review.data,
    });
  }

  async disableReviewBy(id: number) {
    const {data, error} = await this.db.supabase.from('reviews').update({active: false}).eq('review_id', id);
  }
}
