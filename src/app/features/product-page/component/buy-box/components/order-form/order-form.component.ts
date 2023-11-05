import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-order-form',
  template: `
    <div id="order-actions" class="order-commit-container flex flex-col pt-4 items-center w-full pb-4">
      <form name="emailForm" #emailForm="ngForm" class="flex flex-col w-[90%] max-w-[320px] 768:text-xs">
        <label for="email" class="block text-sm 768:text-xs mb-2" [ngClass]="{'invalid-text': !user.emailValidated && user.email}">
          <span class="text-red-600"> &nbsp;{{ user.validationMessage }}</span>
        </label>
        <input
          id="email"
          type="email"
          [(ngModel)]="user.email"
          name="emailInput"
          [ngClass]="{'invalid-border': !user.emailValidated && user.email}"
          class="border rounded py-2 px-3 mb-4"
          placeholder="Tavs e-pasts pasūtījumu veikšanai.."
          (input)="validateEmail(user.email)"
        />
        <label for="nickname" class="block mb-2 text-lg text-black">
          Visiem Rojālajiem
          <span class="text-red-600">-15% ATLAIDE</span>
        </label>
        <input
          id="nickname"
          name="nickname"
          type="text"
          class="border rounded py-2 px-3 mb-4"
          placeholder="Tavs Rojālais segvārds šeit.."
        />

        <button
          (click)="processOrder()"
          id="order-button"
          [ngClass]="{'shake-animation': !user.emailValidated}"
          class="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded h-20 text-3xl font-black font-serif"
        >
          Pasūtīt
        </button>
      </form>
      -
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
