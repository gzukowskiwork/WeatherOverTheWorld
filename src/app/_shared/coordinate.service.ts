import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CoordinateService {
  showCoordsFromService = new Subject<boolean>();
  coordsFromService = new Subject<string>();

  reverseCoordinatesToLatLon(coordinateString: string): {longitude: string, latitude: string}{
    if (coordinateString === undefined){
      return {longitude: '', latitude: ''};
    }else {
      const coordinatesWithoutSpace = coordinateString.replace(/\s+/g, '');
      const array = coordinatesWithoutSpace.split(',');
      array.reverse();
      console.log(array);
      return {
        longitude: array[0],
        latitude: array[1]
      };
     }
  }
}
