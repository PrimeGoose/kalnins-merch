import {NgModule, isDevMode} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
// App routing module and component
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
// Feature modules
import {HomePageComponent} from './features/home-page/home-page.component';
// Angular material
import {AngularMaterialModule} from './shared/modules/angular-material.module';
// Service worker
import {ServiceWorkerModule} from '@angular/service-worker';
import {LoginComponent} from './features/auth-mamager/components/login/login.component';
import {LogoutComponent} from './features/auth-mamager/components/logout/logout.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {MerchHeaderComponent} from './shared/components/merch-header/merch-header.component';

// state management

@NgModule({
  declarations: [AppComponent],
  imports: [
    MerchHeaderComponent,
    FontAwesomeModule, // Add this line
    BrowserModule,
    LoginComponent,
    LogoutComponent,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularMaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    HomePageComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
