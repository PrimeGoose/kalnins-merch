import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div
      [routerLink]="['/kalnins-merch']"
      class="flex flex-col relative   text-center  font-serif font-black my-10 kalnins-merch-header h1-shadow gradient-text h1-hover">
      <h1 class="text-6xl leading-[4.5rem]">Kalniņš Merch</h1>
      <h2 class="text-xl text-sky-400 mt-6">Jura Kalniņa merch veikals</h2>
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
        transition: transform 0.2s;
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
