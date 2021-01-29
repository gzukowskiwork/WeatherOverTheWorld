import {Component, Input, OnInit} from '@angular/core';
import { MenuService } from './header/menu.service';
import {CoordinateService} from './shared/coordinate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MenuService, CoordinateService]
})
export class AppComponent implements OnInit {
  loadedFeature = 'myPlaces';

  constructor(private menuService: MenuService)  {}

  ngOnInit(): void {
    this.menuService.featureSelected
      .subscribe(
        (feature: string) => {
          this.loadedFeature = feature;
        }
      );
  }
}
