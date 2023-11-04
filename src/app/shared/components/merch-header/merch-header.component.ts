import {Component} from '@angular/core';

@Component({
  selector: 'app-merch-header',
  template: `
    <div
      [routerLink]="['/kalnins-merch']"
      class="flex flex-col relative text-center font-serif font-black my-10 kalnins-merch-header h1-shadow gradient-text h1-hover"
    >
      <h1 class="text-6xl leading-[4.5rem]">Kalniņš Merch</h1>
      <h2 class="text-xl text-sky-400 mt-6">Jura Kalniņa merch veikals</h2>
    </div>
  `,
  styles: [
    `
      .h1-shadow {
        text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
      }
      .gradient-text {
        background: linear-gradient(to right, #ffb6c1, #ff69b4, #db7093);
        -webkit-background-clip: text;
        color: transparent;
      }
      .h1-hover:hover {
        transform: scale(1.03);
        transition: transform 0.2s;
      }
      .kalnins-merch-header {
        transition: transform 0.2s;
        font-family: 'Serif';
        font-weight: bold;
        letter-spacing: 1px;
        text-transform: uppercase;
      }
    `,
  ],
})
export class MerchHeaderComponent {}
