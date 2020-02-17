import { LoginComponent } from './components/Identity/login/login.component';
import { RegisterComponent } from './components/Identity/register/register.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'Home/Index2', component: WeatherForecastComponent },
  { path: 'Home/SignUp', component: RegisterComponent},
  { path: 'Home/LogIn', component: LoginComponent},
  { path: 'Home/WeatherForecast', component: WeatherForecastComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
