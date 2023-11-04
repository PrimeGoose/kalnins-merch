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
import {FbShareBtnComponent} from '../components/fb-share-btn/fb-share-btn.component';
import {XShareBtnComponent} from '../components/x-share-btn/x-share-btn.component';
import {SvgIconFbComponent} from '../components/svg-icon-fb/svg-icon-fb.component';
import {SvgIconXComponent} from '../components/svg-icon-x/svg-icon-x.component';
import {SocialShareService} from '../components/social-share/social-share.service';

@NgModule({
  declarations: [
    MerchHeaderComponent,
    SocialShareComponent,
    OrderSuccessComponent,
    ProductCardComponent,
    ProductImageComponent,
    ProductNameComponent,
    ProductPriceComponent,
    FbShareBtnComponent,
    XShareBtnComponent,
    SvgIconFbComponent,
    SvgIconXComponent,
    SocialShareComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    MerchHeaderComponent,
    OrderSuccessComponent,
    ProductCardComponent,
    ProductImageComponent,
    ProductNameComponent,
    ProductPriceComponent,
    FbShareBtnComponent,
    XShareBtnComponent,
    SvgIconFbComponent,
    SvgIconXComponent,
    SocialShareComponent,
  ],
})
export class SharedModule {}
