import { Component, OnInit } from "@angular/core";
import { ProductService, Product } from "../product.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  template: `
    <div class="grid grid-cols-1 640:grid-cols-2 md:grid-cols-3 768:grid-cols-4 gap-4 max-w-screen-1280">
      <!-- Loop through products to display them -->
      <div
        *ngFor="let product of products"
        class="cursor-pointer rounded overflow-hidden shadow-lg hover-effect"
        [routerLink]="['/product', product.id]">
        <img class="w-full" [src]="product.imgages[0]" alt="{{ product.name }}" />
        <div class="px-6 py-4 bg-gradient-to-tr to-100% to-rose-100 from-transparent">
          <div class="font-bold text-xl mb-2 product-name ">{{ product.name }}</div>
          <p class=" product-price text-gray-700  text-lg">Cenas sākot no {{ product.sizes[0].price }} {{ product.currency }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .product-card {
        font-family: "Arial", sans-serif;
        background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white to make text more readable */
        padding: 15px;
        border-radius: 5px;
        transition: transform 0.3s ease-in-out;
      }

      .product-name {
        color: #333;
        font-size: 1.3em;
        margin-bottom: 10px;
      }

      .product-price {
        color: #0077b6; /* Darker shade of blue */
        font-weight: bold;
      }

      .hover-effect {
        transition: all 0.3s ease-in-out;
      }
      .hover-effect:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      }
    `,
  ],
})
export class ProductHomeComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService, private router: Router) {}
  ngOnInit(): void {
    this.products = this.productService.getAllProducts();
  }
  // Get all products
}
