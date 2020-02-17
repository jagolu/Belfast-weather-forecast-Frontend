import { FetchWeatherService } from './services/fetch-weather.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'BelfastWF-fend';

  constructor(private fWeatherS:FetchWeatherService){}
}
