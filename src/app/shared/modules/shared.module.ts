import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchHeaderComponent } from '../components/merch-header/merch-header.component';
import { RouterModule } from '@angular/router';
import { SocialShareComponent } from '../components/social-share/social-share.component';
import { OrderSuccessComponent } from '../components/order-success/order-success.component';
@NgModule({
  declarations: [MerchHeaderComponent,SocialShareComponent,OrderSuccessComponent],
  imports: [
CommonModule,
RouterModule
],
  exports: [MerchHeaderComponent,
SocialShareComponent,
OrderSuccessComponent]
})
export class SharedModule { } 