import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  logCoordinates(coordinate: string[]): void {
    console.log('coordinates are:' + coordinate[0] + ' ' + coordinate[1]);
  }
}
