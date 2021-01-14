import {Component, Input, OnInit} from '@angular/core';
import { MenuService } from './header/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MenuService]
})
export class AppComponent implements OnInit {
  iGetBool: boolean;
  coordinates: string;
  changeVisibilityOfCities: boolean;
  loadedFeature = 'myPlaces';

  constructor(private menuService: MenuService)  {}

  ngOnInit(): void {
    this.menuService.featureSelected
      .subscribe(
      (feature: string) => {
        this.loadedFeature = feature;
      }
    );
  }

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
