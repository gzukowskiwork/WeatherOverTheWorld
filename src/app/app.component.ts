import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  iGetBool: boolean;
  coordinates: string;
  changeVisibilityOfCities: boolean;

  onWeatherForecastRequested(showForecast: boolean): void {
    this.iGetBool = showForecast;
  }

  onCoordinatesEmitRequest(coordinates: string): void {
    this.coordinates = coordinates;
  }

  citiesChanged(eve: boolean): void {
    this.changeVisibilityOfCities = eve;
  }
}
