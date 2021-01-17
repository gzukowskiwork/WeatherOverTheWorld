import {Component, OnInit} from '@angular/core';
import {CoordinateService} from '../shared/coordinate.service';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})

export class WeatherComponent implements OnInit{
  iGetBool: boolean;
  coordinates: string;

  constructor(private coordinateService: CoordinateService) {
  }

  ngOnInit(): void {
   this.coordinateService.showCoordsFromService
     .subscribe(
       (show: boolean) => {
         this.iGetBool = show;
       }
     );
   this.coordinateService.coordsFromService
     .subscribe(
       (coords: string) => {
         this.coordinates = coords;
        }
      );
  }
}
