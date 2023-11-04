import {Component} from '@angular/core';
import {SocialShareService} from '../social-share/social-share.service';
@Component({
  selector: 'app-x-share-btn',
  template: `
    <button
      (click)="shareOnTwitter()"
      class="inline-flex items-center px-6 py-3 whitespace-nowrap bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white rounded-lg"
    >
      Share on
      <app-svg-icon-x></app-svg-icon-x>
    </button>
  `,
  styles: [],
})
export class XShareBtnComponent {
  constructor(private socialShareService: SocialShareService) {}
  shareOnTwitter() {
    this.socialShareService.shareOnTwitter();
  }
}
