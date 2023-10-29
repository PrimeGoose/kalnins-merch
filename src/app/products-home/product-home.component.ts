// product-home.component.ts

import { Component, OnInit } from "@angular/core";
import { ProductService, Product } from "../product.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  template: `
    <div class="grid grid-cols-1 640:grid-cols-2 md:grid-cols-3 768:grid-cols-4 gap-4 max-w-screen-1280">
      <div
        *ngFor="let product of products"
        class="cursor-pointer rounded overflow-hidden shadow-lg hover-effect product-card"
        [routerLink]="['/product', product.id]">
        <img class="w-full" [src]="product.imgages[0]" alt="{{ product.name }}" />
        <div class="px-6 py-4 ">
          <div class="font-bold text-xl mb-2 product-name ">{{ product.name }}</div>
          <p class="product-price">Cenas sākot no {{ product.sizes[0].price }} {{ product.currency }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .product-card {
        font-family: "Arial", sans-serif;
        background: radial-gradient(circle at center, lightgray, transparent);
        padding: 15px;
        border-radius: 5px;
        transition: transform 0.3s ease-in-out;
      }

      /* Product name on the card */
      .product-name {
        color: gray; /* Light gray */
        font-size: 1.3em;
        margin-bottom: 10px;
        text-shadow: 0.5px 0.5px 1px pink; /* Optional: for better readability */
      }

      /* Product price on the card */
      .product-price {
        color: #0077b6;
        font-weight: bold;
        text-shadow: 0.5px 0.5px 1px pink; /* Optional: for better readability */
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
}
