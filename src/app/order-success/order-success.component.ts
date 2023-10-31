import { Component } from "@angular/core";

@Component({
  selector: "app-order-success",
  template: `
    <div class="grid h-screen place-items-center content-between text-center">
      <div class="p-8 bg-white rounded-lg shadow-xl">
        <h1 class="text-5xl font-bold mb-4 text-pink-600">PALDIES!</h1>
        <p class="text-xl mb-2">Tavs pieteikums ir pieņemts.</p>
        <p class="text-lg">
          Ar Tevi pavisam drīz sazināsies
          <strong class="text-pink-600">MERCH SHOP</strong> apkalpošanas speciālists, lai konkretizētu piegādes un apmaksas detaļas!
        </p>
      </div>
    </div>
  `,
  styles: [],
})
export class OrderSuccessComponent {}
