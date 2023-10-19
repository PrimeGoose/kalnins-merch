import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <mat-toolbar>
      <div class="flex flex-row w-full justify-evenly">
        <a href="/kalnins-merch">Shop</a>
      </div>
    </mat-toolbar>
    <!-- <div class="absolute filter blur brightness-50 top-0 left-0 w-[100vw] h-[100vh] -z-0" Style="background-image: url(assets/bg_bajaru2_vakars.jpg);"></div> -->

  <h1 class="flex z-50  text-white relative flex-row w-full justify-center text-4xl font-serif font-black my-20 ">Kalniņš Merch</h1>
  
  <div class="relative text-center z-50 flex place-content-center">
    <router-outlet></router-outlet>
  </div>
  `,
  styles: [],
})
export class AppComponent {
  title = "kalnins-merch";
}
