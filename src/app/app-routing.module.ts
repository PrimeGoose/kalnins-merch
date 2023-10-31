import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RouteGuard } from "./route.guard"; 

import { ProductPageComponent } from "./product-page/product-page.component";
import { ProductHomeComponent } from "./products-home/product-home.component";
import { OrderSuccessComponent } from "./order-success/order-success.component";
const routes: Routes = [
  { path: "product", component: ProductPageComponent },
  { path: "success", component: OrderSuccessComponent, canActivate: [RouteGuard] },
  { path: "", component: ProductHomeComponent, pathMatch: "full" }, // Default route
  { path: "**", redirectTo: "", pathMatch: "full" }, // Catch-all route
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
