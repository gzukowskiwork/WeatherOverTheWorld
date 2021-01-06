import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showCities: boolean;
  @Output() citiesChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleCities(): void {
    this.showCities = !this.showCities;
    this.citiesChange.emit(this.showCities);
    //console.log(this.showCities);
  }

}
