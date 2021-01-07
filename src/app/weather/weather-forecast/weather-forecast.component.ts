import {Component, Input, OnInit} from '@angular/core';
import {LoggingService} from '../../shared/logging.service';
import {HttpClient} from '@angular/common/http';
import {CoordinateService} from '../../shared/coordinate.service';
import {WeatherDataMain} from '../../shared/models/weather-data-main';
import {WeatherService} from '../../shared/weather.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css'],
  providers: [LoggingService, CoordinateService]
})

export class WeatherForecastComponent implements OnInit {
  title = 'prognoza pogody';
  public main: WeatherDataMain;
  @Input() obtainedCoordinates: string;
  constructor(private loggingService: LoggingService,
              private coordinateService: CoordinateService,
              private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  showCoordinates(): string[]{
    return this.coordinateService.reverseCoordinatesToLatLon(this.obtainedCoordinates);
  }

  getWeather() {
    const lat = this.coordinateService.reverseCoordinatesToLatLon(this.showCoordinates()[0]);
    const lon = this.coordinateService.reverseCoordinatesToLatLon(this.showCoordinates()[1]);
    console.log(lon);

    // this.weatherService.getCurrenttWeather(lat, lon)
    //   .subscribe(x => {
    //   this.main = x as WeatherDataMain;
    // });
    }


}
