import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  changeVisibilityOfCities: boolean;
  constructor() { }

  changeCitiesVisibility(status: boolean): void{
    this.changeVisibilityOfCities = status;
    //console.log(this.changeVisibilityOfCities);
  }
}
