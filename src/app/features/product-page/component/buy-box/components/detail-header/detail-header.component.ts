import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-detail-header',
  template: `
    <div id="product-tag-grid" class="grid grid-cols-3 gap-1 mt-4  text-lg">
      <div class="text-center w-16  text-sm uppercase">krāsa</div>
      <div class="text-center w-16  text-sm uppercase">Izmērs</div>
      <div class="text-center w-16  text-sm uppercase">Cena</div>

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
