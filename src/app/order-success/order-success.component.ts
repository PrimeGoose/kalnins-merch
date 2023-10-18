import { Component } from "@angular/core";

@Component({
  selector: "app-order-success",
  template: `
    <div class="grid h-screen place-items-center text-center pb-20">
      <div>
        <h1 class="text-4xl">PALDIES!</h1>
        <p>Tavs pieteikums ir pienemts.</p>
        <p>
          Ar Tevi pavisam driz sazinasies <strong>MERCH SHOP</strong> apkalposanas specialists lai konkretizetu piegades un apmaksas deta
          as!
        </p>
      </div>
    </div>
  `,
  styles: [],
})
export class OrderSuccessComponent {}
