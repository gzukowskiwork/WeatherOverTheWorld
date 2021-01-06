import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  title = 'prognoza pogody';
  @Input() obtainedCoordinates: string;
  constructor() { }

  ngOnInit(): void {
  }

  reverseCoordinates(): string{
    const coordinatesWitgoutSpace = this.obtainedCoordinates.replace(/\s+/g, '');
    const array = coordinatesWitgoutSpace.split(',');
    const wgs84LatLon = array.reverse().toString();

    return wgs84LatLon;
  }

}
