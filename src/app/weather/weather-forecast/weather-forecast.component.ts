import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  title = 'prognoza pogody';
  @Input() wspolrzedne: string;
  constructor() { }

  ngOnInit(): void {
  }

}
