import { AuthGuardService } from './services/auth-guard.service';
import { IdentityService } from './services/identity.service';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FetchWeatherService } from './services/fetch-weather.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './components/Identity/register/register.component';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/Identity/login/login.component';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    WeatherForecastComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    FetchWeatherService,
    IdentityService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
