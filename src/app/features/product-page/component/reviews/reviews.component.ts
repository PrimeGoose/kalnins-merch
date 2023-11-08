import {Component} from '@angular/core';

@Component({
  selector: 'app-reviews',
  template: `
    <div class="bg-white shadow rounded-lg p-4 max-w-4xl mx-auto my-8">
      <div class="border-b pb-4">
        <h2 class="text-xl font-semibold text-gray-800">Customer reviews</h2>
        <p class="text-yellow-500 text-lg">★★★★☆ 4.2 out of 5 stars</p>
        <p class="text-gray-600">15 global ratings</p>
      </div>

      <div class="my-4">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
          <!-- Star rating percentages -->
          <div class="text-sm">
            <div class="flex items-center">
              <span class="text-yellow-500">★★★★★</span>
              <span class="ml-2 text-gray-600">45%</span>
            </div>
            <div class="flex items-center">
              <span class="text-yellow-500">★★★★☆</span>
              <span class="ml-2 text-gray-600">33%</span>
            </div>
            <div class="flex items-center">
              <span class="text-yellow-500">★★★☆☆</span>
              <span class="ml-2 text-gray-600">22%</span>
            </div>
            <div class="flex items-center">
              <span class="text-yellow-500">★★☆☆☆</span>
              <span class="ml-2 text-gray-600">0%</span>
            </div>
            <div class="flex items-center">
              <span class="text-yellow-500">★☆☆☆☆</span>
              <span class="ml-2 text-gray-600">0%</span>
            </div>
          </div>

          <div class="col-span-2 md:col-span-3 text-sm text-gray-600">
            <p>How customer reviews and ratings work</p>
            <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
              Review this product
            </button>
            <p class="mt-2">Share your thoughts with other customers</p>
            <button class="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
              Write a customer review
            </button>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <h3 class="text-lg font-semibold text-gray-800">Top reviews</h3>
        <p class="text-gray-600">Top reviews from Latvia</p>

        <!-- Reviews List -->
        <div class="space-y-4 mt-4">
          <!-- Review Entry -->
          <!-- Repeat this block for each review -->
          <div class="border p-3 rounded">
            <p class="font-bold">TOP G Andrejs</p>
            <p class="text-yellow-500">★★★★☆ 4.0 out of 5 stars</p>
            <p class="text-gray-600 text-sm">
              Iegādājos T-kreklu ar uzrakstu. Kvalitāte un izpildījums ir ļoti labi.
              <br />
              <span class="text-blue-600"> Verified Purchase </span>

              <br />Ļoti laba kvalitāte. Izmēri atbilst. Iesaku
            </p>
            <a href="#" class="text-blue-600 text-sm">Helpful</a>
            <span>|</span>
            <a href="#" class="text-red-600 text-sm">Report</a>
          </div>

          <!-- Repeat for other reviews as necessary... -->
        </div>
        <a href="#" class="text-blue-600">See more reviews</a>
      </div>
    </div>
  `,
  styles: [],
})
export class ReviewsComponent {}
