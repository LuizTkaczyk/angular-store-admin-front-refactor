import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './shared/material/material.module';
import { RegisterComponent } from './home/register/register.component';
import { ListComponent } from './home/list/list.component';
import { ConfigComponent } from './home/config/config.component';
import { SaleComponent } from './home/sale/sale.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData, CurrencyPipe } from '@angular/common';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    ListComponent,
    ConfigComponent,
    SaleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt'},
    { provide:DEFAULT_CURRENCY_CODE, useValue:'BRL'},
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
