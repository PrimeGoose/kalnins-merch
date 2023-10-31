import { Component, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-root",
  template: `
    <div
      [routerLink]="['/kalnins-merch']"
      class="flex flex-col leading-[5rem]  z-50 text-white relative  text-centeer  items-center text-center text-6xl font-serif font-black my-20 kalnins-merch-header h1-shadow gradient-text h1-hover">
      <h1 class="w-full">Kalniņš Merch</h1>
      <h3 class="text-sm text-sky-400 mt-5 ">Jura Kalniņa merch veikals</h3>
    </div>

    <div class="relative text-center z-50 flex flex-col  items-center">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .h1-shadow {
        text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
      }

      .gradient-text {
        background: linear-gradient(to right, #ffb6c1, #ff69b4, #db7093); // Pink gradient colors
        -webkit-background-clip: text;
        color: transparent;
      }

      .h1-hover:hover {
        transform: scale(1.03); // Scale up the header slightly on hover
        transition: transform 0.2s; // Transition for a smooth effect
      }

      .kalnins-merch-header {
        font-family: "Serif"; // Change to your preferred font
        font-weight: bold;
        letter-spacing: 1px; // Spacing between letters for clarity
        text-transform: uppercase; // Make the text uppercase for a more bold look
      }
    `,
  ],
})
export class AppComponent {
  title = "Kakniņš Merch";

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  someMethod() {
    if (isPlatformBrowser(this.platformId)) {
      // Client-only code here
    }
  }
}
