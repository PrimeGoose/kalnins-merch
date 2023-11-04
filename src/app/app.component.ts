import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-merch-header></app-merch-header>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  // ...
}
