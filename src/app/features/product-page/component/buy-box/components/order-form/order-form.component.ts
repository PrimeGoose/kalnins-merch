import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from 'src/app/core/authentication/auth.service';

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
          class="border dark:border-none rounded  text-center dark:bg-gray-800 py-2 mb-2"
          placeholder="Ievadi e-pastu lai pasūtītu.."
          (input)="validateEmail(this.data.data.user.email)"
        />
        <label for="nickname" class="block  text-black dark:text-white py-1">
          Visiem Rojālajiem
          <span class="text-red-600">-15% ATLAIDE</span>
        </label>
        <input
          id="nickname"
          name="nickname"
          type="text"
          class="border dark:border-none rounded  text-center dark:bg-gray-800 py-2 mb-2"
          placeholder="Tavs Rojālais segvārds šeit.."
        />

        }@else{
        <!-- ...existing code... -->
        <ng-container *ngIf="isAuthenticated">
          <div class="p-4 text-center bg-gray-800 border border-gray-700 text-white">
            <h2 class="font-bold text-xl mb-2 text-pink-600">Apsveicam!</h2>
            <p class="text-gray-300">
              Tu esi kvalificējies kā <span class="font-semibold  text-pink-500">"Rojālais"</span> un saņemsi
              <span class="font-semibold text-pink-500">15% atlaidi</span> savam pasūtījumam!
            </p>
            <p class="mt-2 text-gray-400">Priecājamies Tevi redzēt mūsu lojālo klientu pulkā.</p>
          </div>
        </ng-container>

        }
      </form>
    </div>

    <button
      [routerLink]="'/success'"
      (click)="processOrder()"
      id="order-button"
      [ngClass]="{'shake-animation': !user.emailValidated}"
      class=" text-white py-2  rounded  text-xl font-black font-serif w-[200px]
        dark:bg-gradient-to-r from-orange-700 via-orange-500 to-orange-800 dark:border-gray-700
        
        
        "
    >
      Pasūtīt
    </button>
  `,
  styles: [],
})
export class OrderFormComponent implements OnInit {
  isAuthenticated: any = false;

  data: any = [];
  constructor(private auth: AuthService) {}
  async ngOnInit() {
    this.isAuthenticated = await this.auth.getIsAuthenticated();
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
