import {Component, OnInit, OnDestroy} from '@angular/core';
@Component({
  selector: 'app-root',

  template: `
    <app-merch-header></app-merch-header>
    <main class="flex justify-center">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  constructor() {}

  async ngOnInit() {}
  ngOnDestroy() {}
}
