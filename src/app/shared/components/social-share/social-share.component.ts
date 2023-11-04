// share-on-twitter.component.ts

import {Component} from '@angular/core';

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
})
export class SocialShareComponent {
  constructor() {}
}
