import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchHeaderComponent } from './components/merch-header/merch-header.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [MerchHeaderComponent],
  imports: [
CommonModule,
RouterModule
],
  exports: [MerchHeaderComponent]
})
export class SharedModule { }