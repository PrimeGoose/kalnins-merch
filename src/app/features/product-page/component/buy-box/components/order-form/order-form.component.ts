import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-order-form',
  template: `
    <div id="order-actions" class="order-commit-container flex flex-col items-center w-full">
      <form name="emailForm" #emailForm="ngForm" class="flex flex-col w-full text-xs text-center">
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
          class="border rounded py-2 text-center dark:bg-slate-600 dark:border-slate-500
          "
          placeholder="Ievadi e-pastu lai pasūtītu.."
          (input)="validateEmail(user.email)"
        />
        <label for="nickname" class="block  text-black dark:text-white py-1">
          Visiem Rojālajiem
          <span class="text-red-600">-15% ATLAIDE</span>
        </label>
        <input
          id="nickname"
          name="nickname"
          type="text"
          class="border rounded py-2 mb-2 text-center dark:bg-slate-600 dark:border-slate-500"
          placeholder="Tavs Rojālais segvārds šeit.."
        />

        <button
          (click)="processOrder()"
          id="order-button"
          [ngClass]="{'shake-animation': !user.emailValidated}"
          class="bg-orange-400 hover:bg-orange-500 text-white py-2  rounded  text-xl font-black font-serif"
        >
          Pasūtīt
        </button>
      </form>
    </div>
  `,
  styles: [],
})
export class OrderFormComponent {
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
