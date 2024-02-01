import {Component, OnInit, OnDestroy} from '@angular/core';
import {fadeAnimation} from './core/animations/fadeAnimation';
import {MerchHeaderComponent} from './shared/components/merch-header/merch-header.component';
@Component({
  selector: 'app-root',
  // standalone: true,
  animations: [fadeAnimation],

  template: `
    <app-merch-header></app-merch-header>
    <main [@fadeAnimation]="o.isActivated ? o.activatedRoute : ''">
      <router-outlet #o="outlet"></router-outlet>
    </main>
  `,
  styles: [
    `
      :host {
        padding-bottom: 3rem;
      }
    `,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor() {}

  async ngOnInit() {}
  ngOnDestroy() {}
}
