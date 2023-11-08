import {Component} from '@angular/core';

@Component({
  selector: 'app-description',
  template: `
    <!-- Product Description -->
    <div class="bg-[#F7F7F7] p-6 rounded-lg shadow-sm w-full">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Product Description</h2>
      <p class="text-gray-600 mb-4">
        Detailed explanation of the product, its design philosophy, and what makes it unique. Include any relevant information that can help
        customers understand the value of the product.
      </p>
    </div>
  `,
  styles: [],
})
export class DescriptionComponent {}
