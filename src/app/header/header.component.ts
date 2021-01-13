import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showCities: boolean;
  citiesText = 'Pokaż miasta';
  @Output() citiesChange = new EventEmitter<boolean>();
  @Output() featureSelected = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  toggleCities(): void {
    this.showCities = !this.showCities;
    this.citiesChange.emit(this.showCities);
    if(this.showCities){
      this.citiesText = 'Ukryj miasta';
    }else{
      this.citiesText = 'Pokaż miasta';
    }
  }

  onSelect(feature: string): void {
    this.featureSelected.emit(feature);
  }
}
