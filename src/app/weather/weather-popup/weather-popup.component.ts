import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CoordinateService} from '../../shared/coordinate.service';
import {WeatherService} from '../../shared/weather.service';

@Component({
  selector: 'app-weather-popup',
  templateUrl: './weather-popup.component.html',
  styleUrls: ['./weather-popup.component.css'],
  providers: [CoordinateService]
})
export class WeatherPopupComponent implements OnInit, OnChanges {
  public main: any;

  constructor(private coordinateService: CoordinateService,
              private weatherService: WeatherService) { }

  @Input() coordinates: string;
  ngOnInit(): void {
    this.getWeather();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[this.coordinates]){
      this.showCoordinates();
    }
  }

  showCoordinates(): {longitude: string, latitude: string} {
    return this.coordinateService.reverseCoordinatesToLatLon(this.coordinates);
  }

  getWeather(): void {
      const lat = this.showCoordinates().longitude;
      const lon = this.showCoordinates().latitude;

      this.weatherService.getCurrenttWeather(lat, lon)
        .subscribe(x => {
          this.main = x as any;
        });
    }
}