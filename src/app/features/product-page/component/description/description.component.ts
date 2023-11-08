import { Component } from '@angular/core';

@Component({
  selector: 'app-description',
  template: `
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <!-- Product Description Section -->
        <div class="w-full md:w-1/2">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
          <p class="text-gray-700 mb-4">
            Detailed explanation of the product, its design philosophy, and what makes it unique. Include any relevant information that can
            help customers understand the value of the product.
          </p>
        </div>

        <!-- Product History Section -->
        <div class="w-full md:w-1/2">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Product History</h2>
          <p class="text-gray-700 mb-4">
            Share the story behind the product's creation. This can include the inspiration behind it, any challenges overcome during the
            development process, or how it has evolved over time.
          </p>
        </div>
      </div>

      <!-- How It's Made Section -->
      <div class="mt-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">How It's Made</h2>
        <p class="text-gray-700">
          Offer insights into the manufacturing process. This might cover the materials used, the craftsmanship involved, or the quality
          checks that ensure the product meets high standards.
        </p>
      </div>
    </div>
  `,
  styles: [],
})
export class DescriptionComponent {}
