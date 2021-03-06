import {Component, Input, OnInit} from '@angular/core';
import {CoordinateService} from '../_shared/coordinate.service';

@Component({
    selector: 'app-place',
    templateUrl: './place.component.html',
    styleUrls: ['./place.component.css']
  })

export class PlaceComponent  implements OnInit{
  show = false;
  coordinates: string;
  constructor(private coordinateService: CoordinateService) {
  }

  ngOnInit(): void {
    this.coordinateService.showCoordsFromService
      .subscribe(
        (shouldI: boolean) => {
          this.show = shouldI;
        }
      );

    this.coordinateService.coordsFromService
      .subscribe(
        (coords: string) => {
          this.coordinates = coords;
        }
      );
    }

    hideComponentEventHandler($event: any): void{
      this.show = $event;
    }
  }
