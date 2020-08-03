import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {SharedModule} from './shared/shared.modules';
import {CoreModule} from './core.module';
import {ProductComponent} from './product/product.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IphoneComponent} from './product/iPhone/iphone.component';
import {WatchComponent} from './product/Watch/watch.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductComponent,
    IphoneComponent,
    WatchComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
