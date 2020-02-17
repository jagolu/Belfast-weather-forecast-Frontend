
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rest } from './Rest';
import { Locations } from '../models/Location/Locations';

@Injectable({
  providedIn: 'root'
})
export class FetchWeatherService extends Rest{

  
  private readonly weatherApiPath : string = "api/weather";

  constructor(private _http:HttpClient) {
    super(_http);
  }

  public getWeatherForecast(location:number){
    return this.getRequest(this.weatherApiPath, [
      {"param": "location", "value": location.toString()}
    ]);
  }
}
