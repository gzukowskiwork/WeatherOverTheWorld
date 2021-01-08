import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LoggingService} from '../../shared/logging.service';
import {CoordinateService} from '../../shared/coordinate.service';
import {WeatherService} from '../../shared/weather.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css'],
  providers: [LoggingService, CoordinateService]
})

export class WeatherForecastComponent implements OnInit, OnChanges {
  title = 'weather forecast';

  public main: any;
  @Input() obtainedCoordinates: string;
  constructor(private loggingService: LoggingService,
              private coordinateService: CoordinateService,
              private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeather();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[this.obtainedCoordinates]){
      this.showCoordinates();
    }
  }

  showCoordinates(): {longitude: string, latitude: string} {
    return this.coordinateService.reverseCoordinatesToLatLon(this.obtainedCoordinates);
  }

  getWeather(): void {
    const lat = this.showCoordinates().longitude;
    const lon = this.showCoordinates().latitude;

    this.weatherService.getForecast(lat, lon)
      .subscribe(x => {
        this.main = x as any;
      });
    console.log('request send');
  }

}
