import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MerchHeaderComponent} from '../components/merch-header/merch-header.component';
import {RouterModule} from '@angular/router';
import {SocialShareComponent} from '../components/social-share/social-share.component';
import {OrderSuccessComponent} from '../components/order-success/order-success.component';
import {ProductCardComponent} from '../components/product-card/product-card.component';
import {ProductImageComponent} from '../components/product-image/product-image.component';
import {ProductNameComponent} from '../components/product-name/product-name.component';
import {ProductPriceComponent} from '../components/product-price/product-price.component';
@NgModule({
  declarations: [
    MerchHeaderComponent,
    SocialShareComponent,
    OrderSuccessComponent,
    ProductCardComponent,
    ProductImageComponent,
    ProductNameComponent,
    ProductPriceComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    MerchHeaderComponent,
    SocialShareComponent,
    OrderSuccessComponent,
    ProductCardComponent,
    ProductImageComponent,
    ProductNameComponent,
    ProductPriceComponent,
  ],
})
export class SharedModule {}
