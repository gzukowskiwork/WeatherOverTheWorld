import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  changeVisibilityOfCities: boolean;
  featureSelected = new EventEmitter<string>();
  citiesChanged = new EventEmitter<boolean>();

  constructor() {}

}
