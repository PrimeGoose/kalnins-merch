import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription, switchMap} from 'rxjs';
import {SupabaseService} from 'src/app/core/services/supabase.service';
import {Subject} from 'rxjs';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {ProductService} from 'src/app/core/services/product.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
@Component({
  selector: 'app-description',
  template: `
    <!-- Product Description -->
    <!-- Product Description -->
    <div class=" p-6 rounded-lg shadow-sm w-full dark:bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 border-black">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold  mb-4">Apraksts</h2>

        <button
          *ngIf="isManager"
          (click)="editDescription()"
          class="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {{ editBtnLabel }}
        </button>
      </div>
      <textarea
        *ngIf="isEditing"
        class=" mb-4  rounded p-2 w-full dark:bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 "
        [(ngModel)]="description"
        appAutoResize
        rows="15"
      ></textarea>
      <p *ngIf="!isEditing" class=" mb-4   rounded p-2 overflow-auto">
        {{ description || ' ' }}
      </p>
    </div>
  `,
  styles: [],
  standalone: true,
  imports: [NgIf, FormsModule],
})
export class DescriptionComponent implements OnInit {
  id: any = 0;
  description = '';
  routeSubscription: Subscription | undefined;
  descriptionToEdit = '';
  descriptionChange = new Subject<string>();

  isEditing = false;
  editBtnLabel: string = 'Edit' || 'Save';

  constructor(
    private db: SupabaseService,
    private ps: ProductService,
    private auth: AuthService,
    private route: ActivatedRoute,
  ) {}
  isManager = true;
  async ngOnInit() {
    await this.auth.isManager$.subscribe((data) => {
      this.isManager = data;
    });

    this.routeSubscription = this.route.params
      .pipe(
        switchMap((params) => {
          this.id = params['id'];

          return this.ps.product$;
        }),
      )
      .subscribe((products) => {
        products.forEach((product) => {
          if (product.product_id == this.id) {
            this.description = product.description;
          }
        });
      });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  // async getDescriptionById(id: any): Promise<any> {
  //   const {data, error} = await this.db.supabase.from('products').select('description, product_id').eq('product_id', id);
  //   if (error) {
  //     console.error(error);
  //     return '';
  //   }
  //   return data[0].description;
  // }

  async editDescription() {
    if (this.isEditing) {
      // Save logic
      console.log('Saving:', this.description);
      await this.saveDescription(this.description);
      this.isEditing = false;
      this.editBtnLabel = 'Edit';
    } else {
      // Switch to edit mode
      this.descriptionToEdit = this.description;
      this.isEditing = true;
      this.editBtnLabel = 'Save';
    }
  }

  grabInnerText(event: any): void {
    this.description = (event.target as HTMLElement).innerText;
    console.log(this.description);
  }
  handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.isEditing && target.innerText.trim() === '') {
      target.innerText = ' ';
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(target, 0);
      range.collapse(true);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }

  async saveDescription(text: string) {
    console.log('Saving:', text);
    const {data, error} = await this.db.supabase.from('products').update({description: text}).eq('product_id', this.id);
    if (error) {
      console.error(error);
      return '';
    }
    console.log(data, 'data saved?');
    return data;
  }
}
