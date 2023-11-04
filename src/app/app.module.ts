import { NgModule, isDevMode } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
// aap routing module and component
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
//feature modules
import { ProductPageComponent } from "./features/product-page/product-page.component";
import { ProductHomeComponent } from "./features/products-home/product-home.component";
//  angular material
import { AngularMaterialModule } from "./shared/modules/angular-material.module";
//  service worker
import { ServiceWorkerModule } from "@angular/service-worker";
// shared module
import { SharedModule } from "./shared/modules/shared.module";

@NgModule({
  declarations: [
    AppComponent, 
    ProductPageComponent,
     ProductHomeComponent, 
    
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    AngularMaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: !isDevMode(),
      
      registrationStrategy: "registerWhenStable:30000",
    }),
  
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
