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
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ product.name }}</div>
          <p class="text-gray-700 text-base">Cenas sākot no {{ product.sizes[0].price }} {{ product.currency }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
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
