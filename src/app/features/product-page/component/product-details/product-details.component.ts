import {Component} from '@angular/core';

@Component({
  selector: 'app-product-details',
  template: `
    <div class="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto my-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Produkta Detaļas</h2>

      <div class="space-y-2">
        <!-- Product Dimensions -->
        <div>
          <h3 class="font-semibold text-gray-700">Izmēri:</h3>
          <p class="text-gray-600">8 x 7.49 x 6.99 cm; 70 Grami</p>
        </div>

        <!-- Date First Available -->
        <div>
          <h3 class="font-semibold text-gray-700">Pieejams No:</h3>
          <p class="text-gray-600">2022. gada 12. decembris</p>
        </div>

        <!-- Manufacturer -->
        <div>
          <h3 class="font-semibold text-gray-700">Ražotājs:</h3>
          <p class="text-gray-600">Melnie Latvijas Traģiskie Mēmi Zvaigznes</p>
        </div>

        <!-- Item Model Number -->
        <div>
          <h3 class="font-semibold text-gray-700">Preces Modelis:</h3>
          <p class="text-gray-600">dodnauduXL</p>
        </div>

        <!-- Country of Origin -->
        <div>
          <h3 class="font-semibold text-gray-700">Ražošanas Valsts:</h3>
          <p class="text-gray-600">Latvija</p>
        </div>

        <!-- Best Sellers Rank -->
        <div>
          <h3 class="font-semibold text-gray-700">Labāko Pārdevēju Rangs:</h3>
          <p class="text-gray-600">
            1 vietā Rīgā
            <br />
            1 vietā starp T-krekliem
          </p>
        </div>

        <!-- Customer Reviews -->
        <div>
          <h3 class="font-semibold text-gray-700">Klientu Atsauksmes:</h3>
          <p class="flex items-center text-gray-600">
            4.2 no 5 zvaigznēm
            <span class="ml-2 text-sm text-yellow-400">★★★★☆</span>
            <span class="ml-1 text-gray-500 text-sm">15 atsauksmes</span>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ProductDetailsComponent {}
