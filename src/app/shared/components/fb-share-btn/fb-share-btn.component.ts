import {Component} from '@angular/core';
import {SocialShareService} from '../social-share/social-share.service';

@Component({
  selector: 'app-fb-share-btn',
  template: `
    <button
      (click)="shareOnFacebook()"
      class="inline-flex items-center px-6 py-3 whitespace-nowrap bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-white rounded-lg ml-4"
    >
      Share on
      <app-svg-icon-fb></app-svg-icon-fb>
    </button>
  `,
  styles: [],
})
export class FbShareBtnComponent {
  constructor(private socialShareService: SocialShareService) {}

  shareOnFacebook() {
    this.socialShareService.shareOnFacebook();
  }
}
