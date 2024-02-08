import {Component} from '@angular/core';

@Component({
    selector: 'app-product-details',
    template: `
    <!-- Product Details -->
    <div class="bg-[#F7F7F7] p-6 rounded-lg shadow-sm mt-4">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Product Details</h2>
      <div class="flex flex-wrap -mx-2">
        <div class="w-full md:w-1/2 px-2 mb-4">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Produkta Detaļas</h3>
          <ul class="list-disc pl-5 text-gray-600">
            <li>Izmēri: 8 x 7.49 x 6.99 cm; 70 Grami</li>
            <li>Pieejams No: 2023. gada 25. Oktobris</li>
            <li>Ražotājs: Mēneļa Latvijas Tirgūšies Mēmi Zvaigznes</li>
            <!-- Add more details here -->
          </ul>
        </div>
        <div class="w-full md:w-1/2 px-2 mb-4">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Precēs Modelis</h3>
          <p class="text-gray-600">doanoduaXXL</p>
          <h3 class="text-lg font-semibold text-gray-700 mb-2 mt-4">Ražošanas Valsts</h3>
          <p class="text-gray-600">Latvija</p>
          <!-- Add more details here -->
        </div>
      </div>
    </div>
  `,
    styles: [],
    standalone: true,
})
export class ProductDetailsComponent {}
