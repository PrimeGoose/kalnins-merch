import {Component, OnInit, isDevMode} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReviewService} from 'src/app/core/services/review.service';

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
          <!-- user container with float left -->
          <div class="user float-left mr-4">
            <!-- rating element -->
            <div class="items-center text-yellow-500 mb-2">
              <!-- rating on top avatar on bottom -->
              <span [innerHTML]="getStars(review.rating)"></span>
            </div>
            <!-- avatar element -->
            <img src="http://i.pravatar.cc/300?u={{ review.user_id }}" alt="" class="avatar rounded-full w-24 h-24" />
          </div>

          <!-- review text -->
          <div class="review-text">
            <p class="">{{ review.comment }}</p>
          </div>
        </div>
      </ng-container>

      <!-- review write form  -->

      <button (click)="toggleReviewForm()" class="bg-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors">
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
          <div class="w-1/4">
            <img src="http://i.pravatar.cc/300?u={{ 1 }}" alt="" class="rounded-full " />
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
  styles: [],
})
export class ReviewsComponent implements OnInit {
  public reviews: any = [];
  public newReviewText: string = '';
  public showReviewForm: boolean = false;
  private productId: number = 0; // Example product ID

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.route.params.subscribe((params) => {
        this.productId = params['id'];
        this.loadReviews();
      });
    });
  }

  loadReviews() {
    this.reviewService.getAllReviewsBy(this.productId).then((res) => {
      this.reviews = res;
    });
  }

  getStars(rating: number): string {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
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
      comment: this.newReviewText,
      // Add other necessary fields like rating, user_id, etc.
    };
    this.reviewService
      .addReviewBy(newReview)
      .then(() => {
        // Handle success, such as resetting the form and reloading reviews
        this.newReviewText = '';
        this.showReviewForm = true;
        this.loadReviews();
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }
}
