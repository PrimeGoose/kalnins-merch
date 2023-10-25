import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RouteGuard } from './route.guard';  // Add this import


import { ProductPageComponent } from "./product-page/product-page.component";
import { ProductHomeComponent } from "./products-home/product-home.component";
import { OrderSuccessComponent } from "./order-success/order-success.component";
const routes: Routes = [
  { path: "product/:id", component: ProductPageComponent },
  { path: "success", component: OrderSuccessComponent, canActivate: [RouteGuard] },

  { path: "", redirectTo: "", pathMatch: "full" ,component: ProductHomeComponent},
  { path: "**", redirectTo: "", pathMatch: "full" },
  { path: "", component: ProductHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}