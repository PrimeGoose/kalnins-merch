import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <mat-toolbar>
      <div class="flex flex-row w-full justify-evenly">
        <a href="/kalnins-merch">Shop</a>
        <!-- <a href="/about">about</a> -->
        <!-- <a href="/partner">partners</a> -->
      </div>
    </mat-toolbar>

    <h1 class="flex flex-row w-full justify-center text-4xl font-serif font-black my-20">Kalniņš Merch</h1>

    <div class="text-center flex place-content-center">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = "kalnins-merch";
}
