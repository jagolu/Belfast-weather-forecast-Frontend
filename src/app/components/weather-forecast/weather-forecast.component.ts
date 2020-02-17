import { AuthService } from 'src/app/services/auth.service';
import { LocationModel } from '../../models/allModels';
import { FetchWeatherService } from './../../services/fetch-weather.service';
import { Component, OnInit } from '@angular/core';
import { Locations } from 'src/app/models/allModels';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styles: [
    `td {width: 33%}`,
    `img{width: 25%}`
  ]
})
export class WeatherForecastComponent implements OnInit {
  
  public weatherF:any; //The array of forecast for the next 5 days
  public cityname:string; //The name of the city
  public city :LocationModel = Locations.BELFAST; //By default: Belfast 
  public loading:Boolean; //To know if it's loading the request 

  constructor(private _wfS:FetchWeatherService, private _authS:AuthService) { 
    this.cityname = this.city.name;
    this.loading = false;
  }

  ngOnInit() {
    //When the view starts, we get the weather forecast
    this.getForecast();
  }

  /**
   * Do the request again to get the weather forecast
   */
  public reload(){
    this.loading = true; //Starts loading
    this.getForecast(true);
  }

  /**
   * Do the request to get the weather forecast
   * @param {Boolean} stopLoading True if we need to set the loading var to false, false otherwise
   */
  private getForecast(stopLoading:Boolean = false){
    this._wfS.getWeatherForecast(Locations.BELFAST.numberLocation).subscribe(data=>{
      this.weatherF = data;
      if(stopLoading) this.loading = false;
    });
  }
}
