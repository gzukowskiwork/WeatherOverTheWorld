import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  changeVisibilityOfCities: boolean;
  featureSelected: string;
  constructor() { }

  changeCitiesVisibility(status: boolean): void{
    this.changeVisibilityOfCities = status;
    //console.log(this.changeVisibilityOfCities);
  }
  onFeatureChanged(): string {
    console.log(this.featureSelected)
    
    return this.featureSelected;
  }

}
