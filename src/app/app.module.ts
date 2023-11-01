import { NgModule, isDevMode } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// angular material
// import { MatIconModule } from "@angular/material/icon";
// import { MatButtonModule } from "@angular/material/button";
// import { MatToolbarModule } from "@angular/material/toolbar";
// import { MatCardModule } from "@angular/material/card";
// import { MatBadgeModule } from "@angular/material/badge";
// import { MatButtonToggleModule } from "@angular/material/button-toggle";
// import { MatListModule } from "@angular/material/list";
// import { MatCheckboxModule } from "@angular/material/checkbox";
// import { MatChipsModule } from "@angular/material/chips";
// import { MatDividerModule } from "@angular/material/divider";
// import { MatExpansionModule } from "@angular/material/expansion";
// import { MatSelectModule } from "@angular/material/select";
// import { MatInputModule } from "@angular/material/input";
// import { MatFormFieldModule } from "@angular/material/form-field";
// import { MatGridListModule } from "@angular/material/grid-list";
// import { MatMenuModule } from "@angular/material/menu";
// import { MatRadioModule } from "@angular/material/radio";
// import { MatRippleModule } from "@angular/material/core";
// import { MatSidenavModule } from "@angular/material/sidenav";
// import { MatSlideToggleModule } from "@angular/material/slide-toggle";
// import { MatSliderModule } from "@angular/material/slider";
// import { MatSnackBarModule } from "@angular/material/snack-bar";
// import { MatTabsModule } from "@angular/material/tabs";
// import { MatTooltipModule } from "@angular/material/tooltip";
// import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
// import { MatDialogModule } from "@angular/material/dialog";

import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProductPageComponent } from "./product-page/product-page.component";
import { ProductHomeComponent } from "./products-home/product-home.component";
import { OrderSuccessComponent } from "./order-success/order-success.component";
import { SocialShareComponent } from "./social-share/social-share.component";
import { ServiceWorkerModule } from '@angular/service-worker';



@NgModule({
  declarations: [
    AppComponent,
    ProductPageComponent,
    ProductHomeComponent,
    OrderSuccessComponent,
    SocialShareComponent,
  ],
  imports: [
 
    BrowserModule,
    AppRoutingModule,
    // PinchZoomModule,
    // NgxImageZoomModule,
    // angular material
    // MatDialogModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    // MatToolbarModule,
    // MatButtonModule,
    // MatIconModule,
    // MatCardModule,
    // MatBadgeModule,
    // MatListModule,
    // MatButtonToggleModule,
    // MatCheckboxModule,
    // MatChipsModule,
    // MatDividerModule,
    // MatExpansionModule,
    // MatSelectModule,
    // MatInputModule,
    // MatFormFieldModule,
    // MatGridListModule,
    // MatMenuModule,
    // MatRadioModule,
    // MatRippleModule,
    // MatSidenavModule,
    // MatSlideToggleModule,
    // MatSliderModule,
    // MatSnackBarModule,
    // MatTabsModule,
    // MatTooltipModule,
    // MatBottomSheetModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
