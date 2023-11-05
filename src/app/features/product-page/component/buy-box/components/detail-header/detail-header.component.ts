import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-detail-header',
  template: `
    <div id="product-tag-grid" class="grid grid-cols-3 gap-4 border border-gray-400 p-4 rounded">
      <div class="text-center font-semibold uppercase">krāsa</div>
      <div class="text-center font-semibold uppercase">Izmērs</div>
      <div class="text-center font-semibold uppercase">Cena</div>

      <div class="text-center">
        <div class="text-center">
          <span>{{ selected.color_name }}</span>
        </div>
      </div>
      <div class="text-center">
        <span>{{ selected.size }}</span>
      </div>
      <div class="text-center">
        <span>{{ selected.price }} €</span>
      </div>
    </div>
  `,
  styles: [],
})
export class DetailHeaderComponent {
  @Input() selected: any;
}
