// social-share.service.ts
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SocialShareService {
  constructor() {}

  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  private openShareWindow(url: string) {
    const isMobile = this.isMobileDevice();

    if (isMobile) {
      window.open(url, '_blank');
    } else {
      const width = 600;
      const height = 300;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      window.open(url, '_blank', `width=${width},height=${height},left=${left},top=${top}`);
    }
  }

  shareOnTwitter(text: string = 'Tikko ieķēru @kalninsjuris7 Merch #jk7Merch', url: string = 'https://www.kalninsmerch.com/') {
    // this.openShareWindow(`https://twitter.com/share?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
  }

  shareOnFacebook(url: string = 'https://www.kalninsmerch.com/') {
    // this.openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
  }
}
