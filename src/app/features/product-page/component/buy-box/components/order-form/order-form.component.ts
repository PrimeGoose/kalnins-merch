import {Component, Input, OnInit} from '@angular/core';
import {SupabaseService} from 'src/app/core/services/supabase.service';

@Component({
  selector: 'app-order-form',
  template: `
    <div id="order-actions" class="order-commit-container flex flex-col items-center w-full">
      <form name="emailForm" #emailForm="ngForm" class="flex flex-col w-full text-xs text-center">
        @if(!isAuthenticated){
        <label for="email" class="block   mb-2" [ngClass]="{'invalid-text': !user.emailValidated && user.email}">
          <span *ngIf="user.validationMessage" class="text-red-600">{{ user.validationMessage }}</span>
          <span *ngIf="!user.validationMessage" class=" text-center"> Tavs e-pasts pasūtījumu veikšanai..</span>
        </label>
        <input
          id="email"
          type="email"
          [(ngModel)]="user.email"
          name="emailInput"
          [ngClass]="{'invalid-border': !user.emailValidated && user.email}"
          class="border rounded py-2 text-center dark:bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 dark:border-gray-700
          "
          placeholder="Ievadi e-pastu lai pasūtītu.."
          (input)="validateEmail(this.data.data.user.email)"
        />
        }
        <label for="nickname" class="block  text-black dark:text-white py-1">
          Visiem Rojālajiem
          <span class="text-red-600">-15% ATLAIDE</span>
        </label>
        <input
          id="nickname"
          name="nickname"
          type="text"
          class="border rounded py-2 mb-2 text-center dark:bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 dark:border-gray-700"
          placeholder="Tavs Rojālais segvārds šeit.."
        />

        <button
          [routerLink]="'/success'"
          (click)="processOrder()"
          id="order-button"
          [ngClass]="{'shake-animation': !user.emailValidated}"
          class="bg-orange-400 hover:bg-orange-500 text-white py-2  rounded  text-xl font-black font-serif
          dark:bg-gradient-to-r from-orange-700 via-orange-500 to-orange-800 dark:border-gray-700
          
          "
        >
          Pasūtīt
        </button>
      </form>
    </div>
  `,
  styles: [],
})
export class OrderFormComponent implements OnInit {
  isAuthenticated = false;
  data: any = ['ddddddddd'];
  constructor(private db: SupabaseService) {}
  async ngOnInit() {
    this.data = await this.db.supabase.auth.getUser();
    console.log(this.data.data.user.email);
    if (this.data.data.user.aud) {
      this.isAuthenticated = true;
      this.validateEmail(this.data.data.user.email);
    }
  }
  @Input() user: any;
  @Input() onValidateEmail: any;
  @Input() onProcessOrder: any;

  processOrder() {
    this.onProcessOrder.emit();
  }

  validateEmail(email: string) {
    this.onValidateEmail.emit(email);
  }
}
