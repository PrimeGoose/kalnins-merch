// share-on-twitter.component.ts

import {Component} from '@angular/core';
import {FbShareBtnComponent} from './fb-share-btn/fb-share-btn.component';
import {XShareBtnComponent} from './x-share-btn/x-share-btn.component';

@Component({
  selector: 'app-social-share',
  template: `
    <div class="flex flex-row justify-center">
      <!-- Twitter Button -->
      <app-x-share-btn></app-x-share-btn>

      <!-- Facebook Button -->
      <app-fb-share-btn></app-fb-share-btn>
    </div>
  `,
  styles: [
    `
      :host {
        @apply flex flex-row justify-center;
      }
    `,
  ],
  standalone: true,
  imports: [XShareBtnComponent, FbShareBtnComponent],
})
export class SocialShareComponent {
  constructor() {}
}
