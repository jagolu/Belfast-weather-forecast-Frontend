import { LoginComponent } from './components/Identity/login/login.component';
import { RegisterComponent } from './components/Identity/register/register.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthGuardService]},
  { path: 'Home/SignUp', component: RegisterComponent, canActivate: [AuthGuardService]},
  { path: 'Home/LogIn', component: LoginComponent, canActivate: [AuthGuardService]},
  { path: 'Home/WeatherForecast', component: WeatherForecastComponent, canActivate: [AuthGuardService]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
