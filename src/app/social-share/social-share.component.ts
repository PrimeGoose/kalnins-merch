// share-on-twitter.component.ts

import { Component } from "@angular/core";

@Component({
  selector: "app-social-share",
  template: `
    <div class="flex flex-row justify-center">
      <!-- Twitter Button -->
      <button
        (click)="shareOnTwitter()"
        class="inline-flex items-center px-6 py-3 whitespace-nowrap bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white rounded-lg">
        Share on
        <svg class="ml-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <!-- Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
        </svg>
      </button>

      <!-- Facebook Button -->
      <button
        (click)="shareOnFacebook()"
        class="inline-flex items-center px-6 py-3 whitespace-nowrap bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-white rounded-lg ml-4">
        Share on
        <svg class="ml-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <!-- Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
        </svg>
      </button>
    </div>
  `,
  styles: [``],
})
export class SocialShareComponent {
  constructor() {}

  // Define a helper method to detect mobile
  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  private openShareWindow(url: string) {
    const isMobile = this.isMobileDevice();

    if (isMobile) {
      window.open(url, "_blank");
    } else {
      const width = 600;
      const height = 300;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      window.open(url, "_blank", `width=${width},height=${height},left=${left},top=${top}`);
    }
  }

  shareOnTwitter() {
    const text = "Tikko ieķēru @kalninsjuris7 Merch "; // Message you want to share
    const url = "https://www.kalninsmerch.com/"; // URL you want to share
    this.openShareWindow(`https://twitter.com/share?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
  }

  shareOnFacebook() {
    const url = "https://www.kalninsmerch.com/";
    this.openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
  }
}
