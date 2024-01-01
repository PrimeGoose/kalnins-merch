import {StoreModule} from '@ngrx/store';
import {appReducer} from '../reducers/app.reducer';
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
