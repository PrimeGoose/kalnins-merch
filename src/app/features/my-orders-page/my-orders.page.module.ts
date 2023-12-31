import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from 'src/app/shared/modules/shared.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule, // Import SharedModule here instead of individual components
  ],

  // Do not re-export components from SharedModule, they are already exported by SharedModule
  exports: [],
})
export class MyOrdersPageModule {}
