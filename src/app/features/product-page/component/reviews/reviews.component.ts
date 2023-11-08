import {Component} from '@angular/core';

@Component({
  selector: 'app-reviews',
  template: `
    <!-- Reviews -->
    <div class="bg-[#FAFAFA] p-6 mt-4 rounded-lg shadow-sm">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>
      <div class="flex items-center mb-4">
        <div class="flex items-center text-yellow-400 mr-2">
          <!-- Star icons can be added with SVG or as you prefer -->
          <span>⭐⭐⭐⭐⭐</span>
          <span class="text-sm text-gray-500 ml-2">4.2 out of 5 stars</span>
        </div>
        <div class="text-sm text-gray-600">(15 global ratings)</div>
      </div>

      <!-- Review cards -->
      <div class="max-w-md mx-auto">
        <!-- Each review card -->
        <div class="bg-white p-4 rounded-lg shadow-md mb-4">
          <h3 class="text-md font-semibold mb-1 text-gray-800">TOP G Andrejs</h3>
          <div class="flex items-center text-yellow-400 mb-2">
            <!-- Preferably use SVG for stars -->
            <span>⭐⭐⭐⭐⭐</span>
          </div>
          <p class="text-gray-700">Ļoti laba kvalitāte. Izmēri atbilst. Iesaku!</p>
        </div>
        <!-- Repeat for other reviews -->
      </div>

      <div class="text-center mt-4">
        <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors">
          Write a customer review
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class ReviewsComponent {}
