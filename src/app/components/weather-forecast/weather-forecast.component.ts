import { AuthService } from 'src/app/services/auth.service';
import { LocationModel } from '../../models/allModels';
import { FetchWeatherService } from './../../services/fetch-weather.service';
import { Component, OnInit } from '@angular/core';
import { Locations } from 'src/app/models/allModels';
import { BackendURL } from 'src/environments/environment';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styles: [
    `td {width: 33%}`,
    `img{width: 25%}`
  ]
})
export class WeatherForecastComponent implements OnInit {

  public weatherF:any;
  public cityname:string;
  public city :LocationModel = Locations.BELFAST;
  public loading:Boolean;

  constructor(private _wfS:FetchWeatherService, private _authS:AuthService) { 
    this.cityname = this.city.name;
    this.loading = false;
  }

  ngOnInit() {
    console.log(this._authS.IsAuthenticated());
    if(!this._authS.IsAuthenticated()){
      window.location.href = BackendURL+"Home/LogIn";
    }
    this._wfS.getWeatherForecast(Locations.BELFAST.numberLocation).subscribe(data=>{
      this.weatherF = data;
    });
  }

  public reload(){
    this.loading = true;
    this._wfS.getWeatherForecast(Locations.BELFAST.numberLocation).subscribe(data=>{
      this.weatherF = data;
      this.loading = false;
    });
  }
}
