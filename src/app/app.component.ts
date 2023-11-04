import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-merch-header></app-merch-header>
    <div class="relative text-center z-50 flex flex-col items-center">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  // ...
}
