import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showCities: boolean;
  citiesText = 'Pokaż miasta';

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
  }

  toggleCities(): void {
    this.showCities = !this.showCities;
    this.menuService.citiesChanged.emit(this.showCities);
    if(this.showCities){
      this.citiesText = 'Ukryj miasta';
    }else{
      this.citiesText = 'Pokaż miasta';
    }
  }


  onSelect(feature: string): void {
    this.menuService.featureSelected.emit(feature);
  }
}
