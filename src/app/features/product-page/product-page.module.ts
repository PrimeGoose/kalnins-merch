import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarouselComponent} from './component/carousel/carousel.component';
import {ProductPageComponent} from './product-page.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from 'src/app/shared/modules/shared.module';
import {FormsModule} from '@angular/forms';
import {BuyBoxComponent} from './component/buy-box/buy-box.component';
import {DetailHeaderComponent} from './component/buy-box/components/detail-header/detail-header.component';
import {OrderFormComponent} from './component/buy-box/components/order-form/order-form.component';
import {PreviewImagesComponent} from './component/buy-box/components/preview-images/preview-images.component';
import {SizeSelectorComponent} from './component/buy-box/components/size-selector/size-selector.component';

@NgModule({
  declarations: [
    CarouselComponent,
    ProductPageComponent,
    BuyBoxComponent,
    DetailHeaderComponent,
    OrderFormComponent,
    PreviewImagesComponent,
    SizeSelectorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule, // Import SharedModule here instead of individual components
  ],

  // Do not re-export components from SharedModule, they are already exported by SharedModule
  exports: [
    CarouselComponent,
    ProductPageComponent,
    BuyBoxComponent,
    DetailHeaderComponent,
    OrderFormComponent,
    PreviewImagesComponent,
    SizeSelectorComponent,
  ],
})
export class ProductPageModule {}
