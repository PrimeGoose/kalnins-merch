import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-detail-header',
  template: `
    <div id="product-tag-grid" class="grid grid-cols-3 gap-1 border border-gray-400 w-full min-w-[200px] text-[#444444] font-[900]  rounded ">
      <div class="text-center  text-sm uppercase">krāsa</div>
      <div class="text-center  text-sm uppercase">Izmērs</div>
      <div class="text-center  text-sm uppercase">Cena</div>

      <div class="text-center">
        <div class="text-center">
          <span>{{ selected.color_name }}</span>
        </div>
      </div>
      <div class="text-center">
        <span>{{ selected.size }}</span>
      </div>
      <div class="text-center">
        <span class="whitespace-nowrap">{{ selected.price }} €</span>
      </div>
    </div>
  `,
  styles: [],
})
export class DetailHeaderComponent {
  @Input() selected: any;
  // @Input() onBack: any;
  // @Input() onForward: any;
}
