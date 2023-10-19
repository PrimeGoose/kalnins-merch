import { Component, OnInit } from "@angular/core";
import { ProductService, Product } from "../product.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  template: `
    <div class="grid grid-cols-1 640:grid-cols-2 md:grid-cols-3 768:grid-cols-4 gap-4 max-w-screen-1280">
      <!-- Loop through products to display them -->
      <div *ngFor="let product of products" class="cursor-pointer rounded overflow-hidden shadow-lg hover-effect">
        <img class="w-full" [src]="product.imgages[0]" alt="{{ product.name }}" [routerLink]="['/product', product.id]" />
        <div class="px-6 py-4 bg-gradient-to-tr to-100% to-rose-100 from-transparent">
          <div class="font-bold text-xl mb-2 product-name ">{{ product.name }}</div>
          <p class=" product-price text-gray-700  text-lg">Cenas sākot no {{ product.sizes[0].price }} {{ product.currency }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      /* Style for the product name */
      .product-name {
        font-family: "Arial", sans-serif; /* A commonly used web-safe font */
        font-size: 1.2em;
        font-weight: bold;
        color: #ffffff; /* White color for contrast */
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Shadow to make the text pop */
        margin-bottom: 5px; /* Some spacing from the price */
      }

      /* Style for the product price */
      .product-price {
        font-family: "Arial", sans-serif;
        font-size: 1em;
        color: #ffd700; /* Gold color to signify price/value */
        text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
        
        

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
