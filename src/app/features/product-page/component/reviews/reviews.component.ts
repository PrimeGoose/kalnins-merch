import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {ReviewService} from 'src/app/core/services/review.service';
import {SupabaseService} from 'src/app/core/services/supabase.service';
import {Directive, forwardRef, HostListener} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Directive({
  selector: '[editReview]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditReviewDirective),
      multi: true,
    },
  ],
})
export class EditReviewDirective implements ControlValueAccessor {
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('input', ['$event.target.innerText'])
  onInput(value: string): void {
    this.onChange(value);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: any): void {
    const normalizedValue = value == null ? '' : value;
    this.renderer.setProperty(this.el.nativeElement, 'innerText', normalizedValue);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}

@Component({
  selector: 'app-reviews',
  template: `
    <div class="rounded-lg shadow-sm max-w-md">
      <h2 class="text-xl font-semibold mt-8 mb-4">Klientu Atsauksmes</h2>
      <!-- Review cards -->
      <ng-container *ngFor="let review of reviews">
        <div
          class="dark:bg-gradient-to-t dark:from-gray-700 dark:to-gray-800 border dark:border-gray-900
   
    p-4 rounded-lg shadow-md mb-4
    overflow-hidden
    320:min-w-xs
    max-w-md
    
    "
        >
          <div class="user">
            <div class="items-center ">
              <span class="text-yellow-500 mb-2 star-shine " [innerHTML]="getStars(review.rating)"></span>
              <h3 class=" user-name-o text name-shine tracking-widest font-mono">{{ review.data.discord_name }}</h3>
            </div>
            <img [src]="review.data.discord_avatar" alt="" class="avatar rounded-full w-24 h-24" />
          </div>
          <h1 *ngIf="!review.isEditing" class="uppercase gap-2 font-black tracking-widest dark:text-gray-300">
            {{ review.title }}
          </h1>
          <h1
            *ngIf="review.isEditing"
            editReview
            [(ngModel)]="review.editableTitle"
            [contentEditable]="true"
            class="uppercase gap-2 font-black tracking-widest dark:text-gray-300 border"
          ></h1>

          <br />
          <div class="review-text font-mono">
            <p *ngIf="!review.isEditing" class="">
              {{ review.comment }}
            </p>
            <p *ngIf="review.isEditing" editReview [(ngModel)]="review.editableComment" [contentEditable]="true" class="border"></p>
          </div>

          <div
            (click)="toggleEditReview(review)"
            *ngIf="review.user_id == user_id"
            class="edit-icon flex flex-row relative pb-4
          "
          >
            <div class="cancel flex left-0  absolute">
              <span *ngIf="review.isEditing">cancel</span>
              <svg
                *ngIf="review.isEditing"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>

            <div (click)="SaveReview(review)" class="save flex float-right right-0 absolute">
              <span *ngIf="review.isEditing"> save </span>
              <svg
                *ngIf="review.isEditing"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
                />
              </svg>
            </div>

            <!--  -->
            <div class="edit flex right-0 absolute">
              <span *ngIf="!review.isEditing"> edit </span>
              <svg
                *ngIf="!review.isEditing"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </div>
          </div>
        </div>
      </ng-container>

      <!-- review write form  -->

      <button
        *ngIf="canWriteReview && isAuthenticated"
        (click)="toggleReviewForm()"
        class="bg-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
      >
        Write a customer review
      </button>

      <!-- Review form card -->
      <div
        *ngIf="showReviewForm"
        class="mt-4  320:min-w-xs
          max-w-md dark:bg-gradient-to-t dark:from-gray-700 dark:to-gray-800 border dark:border-gray-900 p-4 rounded-lg shadow-md mb-4 overflow-hidden
          bg-gradient-to-l from-slate-50 to-slate-100 border-slate-50 
          "
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
            <h5
              editReview
              [(ngModel)]="newReviewTitle"
              [contentEditable]="true"
              [class.placeholder]="!newReviewTitle"
              class="uppercase gap-2  tracking-widest dark:text-gray-300 border"
            >
              {{ newReviewTitle || 'Review title...' }}3
            </h5>
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
  public canEditMyReview = false;
  public starsSelected = 5;
  public newReviewText: string = '';
  public newReviewTitle: string = '';
  public showReviewForm: boolean = false;
  public data: any = {
    discord_avatar: 'https://i.pravatar.cc/300?u=3',
    discord_name: '',
  };
  public reviews: any = [];
  // public editableReviewTitle: string = '';
  // public editableReviewComment: string = '';
  public isAuthenticated: boolean = false;
  public isManager: boolean = false;
  public canWriteReview = false;
  public user_id: string = '';
  private product_Id: number = 0; // current product

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private db: SupabaseService,
    private auth: AuthService,
  ) {}
  async ngOnInit() {
    this.auth.user$.subscribe(async (data: any) => {
      this.data.discord_name = data.user?.user_metadata.custom_claims.global_name;
      this.data.discord_avatar = data?.user?.user_metadata['avatar_url'];
      this.user_id = data?.user?.id;
      await this.loadReviews();

      const review_ids = new Set(this.reviews.map((review: any) => review.user_id));
      // console.log(review_ids);
      // console.log(this.user_id, 'user id');
      if (review_ids.has(this.user_id)) {
        this.canWriteReview = false;
      } else {
        this.canWriteReview = true;
      }
    });

    this.auth.isManager$.subscribe((data) => {
      this.isManager = data;
    });

    this.auth.isAuthenticated$.subscribe((data) => {
      console.log(data, 'is auth ');
      this.isAuthenticated = data;
    });
  }

  async SaveReview(review: any) {
    if (review.isEditing) {
      console.log(review.editableTitle, review.editableComment, this.product_Id);
      await this.reviewService.editReviewBy(this.product_Id, review.editableTitle, review.editableComment, this.user_id);

      await this.loadReviews();
      review.isEditing = false;
    }
  }

  toggleEditReview(review: any) {
    review.isEditing = !review.isEditing;
    if (review.isEditing) {
      review.editableTitle = review.title;
      review.editableComment = review.comment;
    }
  }

  // async loadReviews() {
  //   let product_Id = 0;
  //   this.route.params.subscribe((params) => {
  //     product_Id = params['id'];
  //   });
  //   this.reviews = await this.reviewService.getAllReviewsBy(product_Id);
  // }
  async loadReviews() {
    this.product_Id = 0;
    this.route.params.subscribe((params) => {
      this.product_Id = params['id'];
    });
    const fetchedReviews = await this.reviewService.getAllReviewsBy(this.product_Id);
    this.reviews = fetchedReviews.map((review) => ({
      ...review,
      isEditing: false,
      editableTitle: review.title,
      editableComment: review.comment,
    }));
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
      return;
    }

    const newReview = {
      productId: this.product_Id,
      user_id: this.user_id,
      comment: this.newReviewText,
      title: this.newReviewTitle,
      rating: this.starsSelected,
      data: this.data,
    };
    this.reviewService
      .addReviewBy(newReview)
      .then(() => {
        this.newReviewText = '';
        this.showReviewForm = false;
        this.canWriteReview = false;
        this.loadReviews();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
