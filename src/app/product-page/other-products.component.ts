import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Product, ProductService } from "../product.service";
@Component({
  selector: "app-other-products",
  template: `
   
    <div class="relative max-w-4xl flex items-center justify-center">
      <div *ngFor="let product of products" class="" >
        <img class="w-full" [src]="product.imgages[0]" alt="{{ product.name }}" />
        <div class="px-6 py-4 ">
          <div class="font-bold text-xl mb-2 product-name">{{ product.name }}{{ product.id }}</div>
          <p class="product-price">Cenas sākot no {{ product.sizes[0].price }} {{ product.currency }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class OtherProductsComponent implements OnInit {
  products: Product[] = [];
  currentPosition: number = 0;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.products = this.productService.getAllProducts();
  }

  scroll(direction: string): void {
    if (direction === "next") {
      this.currentPosition += 1;
    } else {
      this.currentPosition -= 1;
    }
  }
}
