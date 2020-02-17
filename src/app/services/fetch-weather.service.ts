
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rest } from './Rest';

@Injectable({
  providedIn: 'root'
})
export class FetchWeatherService extends Rest{

  // The path to the weather forecast request
  private readonly weatherApiPath : string = "api/weather";

  constructor(private _http:HttpClient) {
    super(_http);
  }

  /**
   * The request to get the weather forecast of a city
   * @param {number} location The id of the city
   */
  public getWeatherForecast(location:number){
    return this.getRequest(this.weatherApiPath, [
      {"param": "location", "value": location.toString()}
    ]);
  }
}
