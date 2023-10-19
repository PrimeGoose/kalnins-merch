import { Component, OnInit } from "@angular/core";
import { ProductService, Product } from "../product.service";

@Component({
  selector: "app-home",
  template: `
    <div class="grid grid-cols-1 640:grid-cols-2 md:grid-cols-3 768:grid-cols-4 gap-4 max-w-screen-1280 ">
      <!-- Loop through products to display them -->
      <div *ngFor="let product of products" class="rounded overflow-hidden shadow-lg">
        <img class="w-full" [src]="product.imgages[0]" alt="{{ product.name }}" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ product.name }}</div>
          <!-- <p class="text-gray-700 text-base">{{ product.price }} {{ product.currency }}</p> -->
        </div>
        <div class="px-6 pt-4 pb-2">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" [routerLink]="['/product', product.id]">
            View Details
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ProductHomeComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.products = this.productService.getAllProducts();
  }
  // Get all products
}
