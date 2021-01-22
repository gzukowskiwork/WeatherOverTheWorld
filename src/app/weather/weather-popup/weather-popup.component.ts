import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {CoordinateService} from '../../shared/coordinate.service';
import {WeatherService} from '../../shared/weather.service';


@Component({
  selector: 'app-weather-popup',
  templateUrl: './weather-popup.component.html',
  styleUrls: ['./weather-popup.component.css'],
  providers: [CoordinateService]
})
export class WeatherPopupComponent implements OnInit, OnChanges {
  main: any;
  temp: number;
  feels_like: string;
  humidity: string;
  wind_speed: number;
  wind_direction: number;
  pressure: number;
  clouds: number;
  sunrise: number;
  sunset: number;

  description: string;
  id: number;
  icon: string;

  constructor(private coordinateService: CoordinateService,
              private weatherService: WeatherService) { }

  @Input() coordinates: string;
  ngOnInit(): void {
  }

  ngOnChanges(): void{
    this.getWeather();
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
          this.temp = this.main.main.temp;
          for (let w of this.main.weather){
            this.id = w.id;
            this.description = w.description;
            this.icon = w.icon;
          }
        });

  }

}
