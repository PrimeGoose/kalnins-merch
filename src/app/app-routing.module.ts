import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteGuard} from './core/guards/route.guard';
import {ProductPageComponent} from './features/product-page/product-page.component';
import {HomePageComponent} from './features/home-page/home-page.component';
import {OrderSuccessComponent} from './shared/components/order-success/order-success.component';
import {AdminDashboardPageComponent} from './features/admin-dashboard-page/admin-dashboard-page.component';
import {MyOrdersComponent} from './features/my-orders-page/my-orders.component';

const routes: Routes = [
  {path: 'product/:id', component: ProductPageComponent},

  {path: 'admin', component: AdminDashboardPageComponent},
  {path: 'orders', component: MyOrdersComponent},
  {path: 'success', component: OrderSuccessComponent},
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
  }, // Default route
  {path: '**', redirectTo: '', pathMatch: 'full'}, // Catch-all route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
