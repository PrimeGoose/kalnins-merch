import {StoreModule} from '@ngrx/store';
import {appReducer} from '../products/reducers/product.reducer';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    // other imports
    StoreModule.forRoot({app: appReducer}),
    // Optional: StoreDevtoolsModule for debugging
  ],
  // ...
})
export class AppModule {}
