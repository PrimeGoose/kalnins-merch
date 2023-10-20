import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div class="absolute filter  bg-cover top-0 left-0 w-[100vw] h-[100vh] -z-0" Style="background-color: pink;"></div>
    <div
      [routerLink]="['/kalnins-merch']"
      class="flex flex-col leading-[5rem]  z-50 text-white relative  w-full items-center text-center text-6xl font-serif font-black my-20 kalnins-merch-header h1-shadow gradient-text h1-hover">
      <h1 class="">Kalniņš Merch</h1>
      <h3 class="text-sm text-sky-400 mt-5 ">Jura Kalniņa merch veikals</h3>
    </div>

    <div class="relative text-center z-50 flex place-content-center">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      /* styles.css */

      /**
 * @file Styles for the Kalniņš Merch header
 */

      /* Create a subtle shadow effect for depth */
      .h1-shadow {
        text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
      }

      /* Use a gradient text color to make the text vibrant and inviting */
      .gradient-text {
        background: linear-gradient(to right, #ffb6c1, #ff69b4, #db7093); /* Pink gradient colors */
        -webkit-background-clip: text;
        color: transparent;
      }

      /* Add a slight hover effect for interactivity */
      .h1-hover:hover {
        transform: scale(1.03); /* Scale up the header slightly on hover */
        transition: transform 0.2s; /* Transition for a smooth effect */
      }

      /* Combine the above styles for the final look */
      .kalnins-merch-header {
        font-family: "Serif"; /* Change to your preferred font */
        font-weight: bold;
        letter-spacing: 1px; /* Spacing between letters for clarity */
        text-transform: uppercase; /* Make the text uppercase for a more bold look */
      }
    `,
  ],
})
export class AppComponent {
  title = "kalnins-merch";
}
