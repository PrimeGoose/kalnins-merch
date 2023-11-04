import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';

@Component({
  selector: 'app-order-success',

  template: `
    <div class="grid h-screen place-items-center content-between text-center px-4 md:px-0">
      <div class="flex flex-col p-4 md:p-8 bg-white rounded-lg shadow-xl max-w-xl mx-auto w-full">
        <h1 class="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-pink-600">PALDIES!</h1>
        <p class="text-lg md:text-xl mb-3 md:mb-4">Tavs pieteikums ir pieņemts.</p>
        <p class="text-md md:text-lg mb-4 md:mb-6">
          Ar Tevi pavisam drīz sazināsies
          <strong class="text-pink-600">MERCH SHOP</strong> apkalpošanas speciālists, lai konkretizētu piegādes un apmaksas detaļas!
        </p>
        <app-social-share></app-social-share>
      </div>
    </div>
  `,
  styles: [``],
})
export class OrderSuccessComponent implements OnInit, OnDestroy {
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {}
}
