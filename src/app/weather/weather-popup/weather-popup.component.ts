import {Component, Input, OnInit} from '@angular/core';
import {LoggingService} from '../../shared/logging.service';
import {CoordinateService} from '../../shared/coordinate.service';
import {WeatherService} from '../../shared/weather.service';
import {WeatherDataMain} from '../../shared/models/weather-data-main';

@Component({
  selector: 'app-weather-popup',
  templateUrl: './weather-popup.component.html',
  styleUrls: ['./weather-popup.component.css'],
  providers: [CoordinateService]
})
export class WeatherPopupComponent implements OnInit {
  public main: WeatherDataMain;

  constructor(private coordinateService: CoordinateService,
              private weatherService: WeatherService) { }

  @Input() coordinates: string;
  ngOnInit(): void {

  }

  justATestMethod(): string[]{
    return this.coordinateService.reverseCoordinatesToLatLon(this.coordinates);
  }

  getWeather() {
    // const lat = this.coordinateService.reverseCoordinatesToLatLon(this.coordinates)[0];
    // const lon = this.coordinateService.reverseCoordinatesToLatLon(this.coordinates)[0];

    // this.weatherService.getCurrenttWeather(lat, lon)
    //   .subscribe(x => {
    //   this.main = x as WeatherDataMain;
    // });
    console.log(this.coordinates);
    //console.log(this.justATestMethod()[1]);
  }

}
