import {Component, OnInit } from '@angular/core';
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

  onPlaceClick(placeName: string): void{
    if (placeName === 'roma'){
      this.iGetBool = true;
      this.coordinates = '12.48205, 41.89397';
    }
    if (placeName === 'osowa'){
      this.iGetBool = true;
      this.coordinates = '18.47219, 54.43211';
    }
    if (placeName === 'wrzeszcz'){
      this.iGetBool = true;
      this.coordinates = '18.60450, 54.37924';
    }
  }
}
