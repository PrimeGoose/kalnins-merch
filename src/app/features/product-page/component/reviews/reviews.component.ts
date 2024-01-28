import {Component, OnInit, isDevMode} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, combineLatest, map} from 'rxjs';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {ReviewService} from 'src/app/core/services/review.service';
import {SupabaseService} from 'src/app/core/services/supabase.service';
import {Selected} from '../../../../core/models/product.model';

@Component({
  selector: 'app-reviews',
  template: `
    <div class="rounded-lg shadow-sm max-w-md">
      <h2 class="text-xl font-semibold mt-8 mb-4">Klientu Atsauksmes</h2>
      <!-- Review cards -->
      <ng-container *ngFor="let review of reviews">
        <div
          class="
    bg-gradient-to-t from-gray-700 to-gray-800 border border-gray-900 
    p-4 rounded-lg shadow-md mb-4
    overflow-hidden
    320:min-w-xs
    max-w-md
    "
        >
          <div class="user float-left mr-4">
            <div class="items-center ">
              <span class="text-yellow-500 mb-2 star-shine " [innerHTML]="getStars(review.rating)"></span>
              <h3 class=" user-name-o text name-shine">{{ review.data.discord_name }}</h3>
            </div>
            <img [src]="review.data.discord_avatar" alt="" class="avatar rounded-full w-24 h-24" />
          </div>
          <h1 class=" uppercase review-title font-black  dark:text-gray-300">{{ review.title }}</h1>
          <br />
          <div class="review-text ">
            <p class="">{{ review.comment }}</p>
          </div>
        </div>
      </ng-container>

      <!-- review write form  -->

      <button
        *ngIf="canWriteReview"
        (click)="toggleReviewForm()"
        class="bg-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
      >
        Write a customer review
      </button>

      <!-- Review form card -->
      <div
        *ngIf="showReviewForm"
        class="mt-4  320:min-w-xs
          max-w-md bg-gradient-to-t from-gray-700 to-gray-800 border border-gray-900 p-4 rounded-lg shadow-md mb-4 overflow-hidden"
      >
        <div class="flex items-start">
          <!-- User avatar -->
          <div class="w-1/4 mr-2">
            <div class="flex flex-col">
              <img [src]="data.discord_avatar" alt="" class="rounded-full " />
              <div class="select-stars mt-2 whitespace-nowrap">
                <button *ngFor="let star of [1, 2, 3, 4, 5]; let idx = index" (click)="selectStars(idx + 1)" class="text-yellow-500">
                  <span [class]="starsSelected >= idx + 1 ? 'fas fa-star' : 'far fa-star'"></span>
                </button>
              </div>
            </div>
          </div>

          <!-- Textarea for review text -->
          <div class="flex-grow">
            <textarea
              class="w-full h-32 p-3 text-base text-white bg-transparent border-none focus:ring-0"
              placeholder="Your review..."
              rows="10"
              cols="50"
              [(ngModel)]="newReviewText"
            ></textarea>
          </div>
        </div>

        <!-- Submit button -->
        <div class="text-right">
          <button (click)="submitReview()" class="bg-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .review-title {
        font-family: 'Playfair Display', serif;
      }

      .avatar {
        border-radius: 50%; /* Makes the image round */
        object-fit: cover; /* Ensures the image covers the area without distortion */
        object-position: center; /* Centers the image in the frame */
        width: 100px; /* Set your desired width */
        height: 100px; /* Set your desired height, same as width for 1:1 aspect ratio */
      }

      .name-shine {
        background: linear-gradient(to left, white 0%, gold 10%, gold 90%);
        background-size: 200% auto;
        // filter: brightness(1.2);
        color: #000; /* Fallback for browsers that do not support gradient text */
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shine 2s backwards infinite;
        // display: inline-block;
      }

      @keyframes shine {
        to {
          background-position: 200% center;
        }
      }

      .star-shine {
        background: linear-gradient(to right, yellow 0%, gold 90%, yellow 100%);
        background-size: 200% 200%;
        color: #000; // Fallback for browsers that do not support gradient text
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation:
          shine-horizontal 2s forwards infinite,
          shine-vertical 3s backwards infinite;
      }

      @keyframes shine-horizontal {
        0% {
          background-position: 50% center;
          filter: brightness(1.1);
        }
        100% {
          background-position: 100% center;
          filter: brightness(1.1);
        }
        50% {
          background-position: 100% center;
          filter: brightness(0.8);
        }
      }

      @keyframes shine-vertical {
        0% {
          background-position: 0% center;
        }
        100% {
          background-position: 100% center;
        }
        50% {
          background-position: 200% center;
        }
      }
    `,
  ],
})
export class ReviewsComponent implements OnInit {
  public starsSelected = 5;

  public newReviewText: string = '';
  public showReviewForm: boolean = false;
  public data: any = {
    discord_avatar: 'https://i.pravatar.cc/300?u=3',
    discord_name: '',
  };
  public reviews: any = [];
  public isAuthenticated: boolean = false;
  public isManager: boolean = false;
  public canWriteReview = false;
  private user_id: string = '';
  private productId: number = 0; // current product

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private db: SupabaseService,
    private auth: AuthService,
  ) {}
  async ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
    });

    this.auth.user$.subscribe(async (data: any) => {
      this.data.discord_name = data.user?.user_metadata.custom_claims.global_name;
      this.data.discord_avatar = data?.user?.user_metadata['avatar_url'];
      // console.log(data);
      this.user_id = data?.user?.id;
      // console.log(data?.user?.id);
      await this.loadReviews();

      const review_ids = new Set(this.reviews.map((review: any) => review.user_id));
      console.log(review_ids);
      console.log(this.user_id, 'user id');
      if (review_ids.has(this.user_id)) {
        this.canWriteReview = false;
      } else {
        this.canWriteReview = true;
      }
    });

    this.auth.isManager$.subscribe((data) => {
      // console.log(data, 'manager');
      this.isManager = data;
    });

    this.auth.getIsAuthenticated().then((res) => {
      // console.log(res);
      this.isAuthenticated = res;
    });
  }

  async loadReviews() {
    this.reviews = await this.reviewService.getAllReviewsBy(this.productId);
  }

  getStars(rating: number): string {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  }
  selectStars(stars: number): void {
    this.starsSelected = stars;
  }

  toggleReviewForm() {
    this.showReviewForm = !this.showReviewForm;
  }

  submitReview() {
    if (!this.newReviewText) {
      // Handle empty input, possibly with an error message
      return;
    }

    const newReview = {
      productId: this.productId,
      user_id: this.user_id,
      comment: this.newReviewText,
      rating: this.starsSelected,
      data: this.data,
      // Add other necessary fields like rating, user_id, etc.
    };
    this.reviewService
      .addReviewBy(newReview)
      .then(() => {
        // Handle success, such as resetting the form and reloading reviews
        this.newReviewText = '';
        this.showReviewForm = false;
        this.canWriteReview = false;
        this.loadReviews();
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }

  // async checkIfUserCanReview() {
  //   // Check if the user has already reviewed the current product
  //   setTimeout(() => {
  //     const userReviewForProduct = this.reviews.find(
  //       (review: any) => review.userId === this.user_id && review.productId === this.productId,
  //     );

  //     // If such a review exists, user cannot write another review
  //     this.canWriteReview = userReviewForProduct
  //     // if no review from use for this product id exists, allow to write a review
  //     if (this.canWriteReview) {
  //       this.canWriteReview = false;
  //     } else {
  //       this.canWriteReview = true;
  //     }
  //   }, 5000);
  // }
}
