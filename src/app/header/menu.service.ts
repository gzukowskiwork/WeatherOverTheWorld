import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  featureSelected = new EventEmitter<string>();
  citiesChanged = new EventEmitter<boolean>();

  constructor() {}

}
