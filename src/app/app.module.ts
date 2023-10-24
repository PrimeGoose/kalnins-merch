import { NgModule } from "@angular/core";

// angular material
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatListModule } from "@angular/material/list";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatRippleModule } from "@angular/material/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";

import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProductPageComponent } from "./product-page/product-page.component";
import { ProductHomeComponent } from "./products-home/product-home.component";
import { NgxImageZoomModule } from "ngx-image-zoom";
import { PinchZoomModule } from "@mtnair/ngx-pinch-zoom";
import { IconsModule, ICONS_OUTLINE, ICONS_SOLID, ICONS_MINI } from "@amithvns/ng-heroicons";
import { OrderSuccessComponent } from "./order-success/order-success.component";

// // HammerJS must be imported separately
// @Injectable()
// export class MyHammerConfig extends HammerGestureConfig {
//   override overrides = <any>{
//     swipe: { direction: (window as any).Hammer.DIRECTION_ALL },

//   };
// }

@NgModule({
  declarations: [AppComponent, ProductPageComponent, ProductHomeComponent, OrderSuccessComponent],
  imports: [
    IconsModule.withIcons({
      ...ICONS_OUTLINE,
      ...ICONS_SOLID,
      ...ICONS_MINI,
    }),
    BrowserModule,
    AppRoutingModule,
    PinchZoomModule,
    NgxImageZoomModule,
    // angular material
    MatDialogModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule,
    MatListModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatMenuModule,
    MatRadioModule,
    MatRippleModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
    MatBottomSheetModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
