import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ToolbarComponent} from 'src/app/features/toolbar/toolbar.component';

@Component({
  selector: 'app-merch-header',
  standalone: true,
  imports: [ToolbarComponent, RouterModule],
  template: `
    <div class=" cursor-pointer shop-header flex flex-col text-center  font-serif  my-6 gradient-text">
      <h1 [routerLink]="['/kalnins-merch']" class="shop-title text-6xl leading-[4.5rem] ">Kalniņš Merch</h1>
      <h2 [routerLink]="['/kalnins-merch']" class="shop-subtitle text-xl  mt-6">Jura Kalniņa merch veikals</h2>
    </div>
    <app-toolbar class="flex justify-center m-4"> </app-toolbar>
  `,
  styles: [
    `
      .shop-subtitle {
        background: linear-gradient(to right, aqua 0%, blue 50%, turquoise 100%);
        background-size: 200% auto;
        color: #000; /* Fallback for browsers that do not support gradient text */
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shine 2s linear infinite;
        display: inline-block;
      }

      @keyframes shine {
        to {
          background-position: 200% center;
        }
      }

      .gradient-text {
        background: linear-gradient(to right, blue, red, purple);
        -webkit-background-clip: text;
        color: transparent;
      }

      .shop-header:hover {
        transform: scale(1.03);
        transition: transform 0.2s;
      }
      .shop-header {
        transition: transform 0.2s;
        font-family: 'Serif';
        font-weight: bold;
        letter-spacing: 1px;
        text-transform: uppercase;
        animation: center_from_left 1s backwards;
      }

      @keyframes center_from_left {
        0% {
          width: 35rem;
          filter: blur(20px);
        }
        100% {
          width: 100%;
        }
      }
    `,
  ],
})
export class MerchHeaderComponent {}
