import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductPageComponent } from "./product-page/product-page.component";
import { ProductHomeComponent } from "./products-home/product-home.component";
import { OrderSuccessComponent } from "./order-success/order-success.component";
const routes: Routes = [
  { path: "product/:id", component: ProductPageComponent },
  { path: "success", component: OrderSuccessComponent },
  { path: "", redirectTo: "", pathMatch: "full" },
  { path: "**", redirectTo: "", pathMatch: "full" },
  { path: "", component: ProductHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
