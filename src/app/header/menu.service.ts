import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  featureSelected = new Subject<string>();
  citiesChanged = new Subject<boolean>();

  constructor() {}

}
