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
// Shared module
import {SharedModule} from './shared/modules/shared.module';
import {ProductPageModule} from './features/product-page/product-page.module';
import {LoginComponent} from './features/auth-mamager/components/login/login.component';
import {ToolbarComponent} from './features/toolbar/toolbar.component';
import {LogoutComponent} from './features/auth-mamager/components/logout/logout.component';

@NgModule({
  declarations: [AppComponent, HomePageComponent, ToolbarComponent],

  imports: [
    LoginComponent,
    LogoutComponent,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule, // Correct this if it's indicated as an error, ensure SharedModule is error-free

    FormsModule,
    AngularMaterialModule,

    ProductPageModule, // Ensure that ProductPageModule doesn't redeclare SharedModule's components

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
