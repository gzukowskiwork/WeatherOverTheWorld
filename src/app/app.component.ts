import {Component, Input, OnInit} from '@angular/core';
import { MenuService } from './header/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MenuService]
})
export class AppComponent {
  iGetBool: boolean;
  coordinates: string;
  changeVisibilityOfCities: boolean;
  loadedFeature = 'weather';

  constructor (private menuService: MenuService)  {}


  onWeatherForecastRequested(showForecast: boolean): void {
    this.iGetBool = showForecast;
    this.menuService.onFeatureChanged();
  }

  onCoordinatesEmitRequest(coordinates: string): void {
    this.coordinates = coordinates;
  }

  citiesChanged(eve: boolean): void {
    this.changeVisibilityOfCities = eve;
  }

  onNavigate(): void {
    this.loadedFeature = this.menuService.onFeatureChanged();
  }
}
