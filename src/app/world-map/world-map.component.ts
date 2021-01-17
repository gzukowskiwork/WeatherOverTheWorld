import {Component, OnInit} from '@angular/core';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {OSM} from 'ol/source';
import {toStringXY} from 'ol/coordinate';
import {toLonLat} from 'ol/proj';
import Overlay from 'ol/Overlay';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { MenuService } from '../header/menu.service';
import {CoordinateService} from '../shared/coordinate.service';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})

export class WorldMapComponent implements OnInit {
  map: Map;
  showForecast = false;
  hdms: string;
  layer: VectorLayer;

  private geoJsonUrl = 'https://raw.githack.com/drei01/geojson-world-cities/master/cities.geojson';
  private ShowCities: boolean;

  set showCities(value: boolean){
    this.ShowCities = value;
    this.updateVisibility();
  }
  get showCities(): boolean{
    return this.ShowCities;
  }

  private static createOverlay(container: HTMLElement): Overlay {
    return new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });
  }
  constructor(private menuService: MenuService, private coordinateService: CoordinateService) { }

  ngOnInit(): void {
    this.initializeMap();
    this.menuService.citiesChanged
    .subscribe(
      (cityChanger: boolean) => {
        this.showCities = cityChanger;
      }
    );
  }


  initializeMap(): void {
    const content = document.getElementById('popup-content');
    const container = document.getElementById('popup');
    const closer = document.getElementById('popup-closer');

    const overlay = WorldMapComponent.createOverlay(container);

    this.closeCoordinatesPopup(closer, overlay);

    this.setMapProperties(overlay);
    this.layer = this.geoJsonVectorLayer();
    this.map.addLayer(this.layer);

    this.addLayersToMap();

    this.showCoordinatePopup(content, overlay);
  }

  private addLayersToMap(): void {
    this.map.addLayer(this.geoJsonVectorLayer());
  }

  private setMapProperties(overlay: Overlay): void {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
      ],
      overlays: [overlay],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
    });
  }

  private showCoordinatePopup(content: HTMLElement, overlay: Overlay): void {
      this.map.on('singleclick', (evt) => {
        const coordinate = evt.coordinate;
        this.hdms = toStringXY(toLonLat(coordinate), 5);
        overlay.setPosition(coordinate);
      });

  }

  private geoJsonVectorLayer(): VectorLayer {
    return new VectorLayer({
      source: new VectorSource({
        url: this.geoJsonUrl,
        format: new GeoJSON()
      }),
      visible: false
    });
  }

  private updateVisibility(): void{
    this.layer.setVisible(this.showCities);
    console.log(this.showCities);
  }

  private closeCoordinatesPopup(closer: HTMLElement, overlay: Overlay): void {
    closer.onclick = () => {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };
  }

  onShowWeatherForecastClickedOnMap(): void{
    this.toggleShowForecast();

    this.coordinateService.showCoordsFromService.emit(this.showForecast);
    this.coordinateService.coordsFromService.emit(this.hdms);
  }

  private toggleShowForecast(): void {
    this.showForecast = !this.showForecast;
  }

  hideWeatherForecast(): void {
    this.showForecast = false;

    this.coordinateService.showCoordsFromService.emit(false);
  }

  onPlaceClick(placeName: string): void{
      if (placeName === 'roma'){
        this.onShowWeatherForecastClicked('12.48205, 41.89397');
      }
      if (placeName === 'osowa'){
        this.onShowWeatherForecastClicked('18.47219, 54.43211');
      }
      if (placeName === 'wrzeszcz'){
        this.onShowWeatherForecastClicked('18.60450, 54.37924');
      }
  }

  private onShowWeatherForecastClicked(coordText: string): void {
    this.toggleShowForecast();

    this.coordinateService.coordsFromService.emit(coordText);
    this.coordinateService.showCoordsFromService.emit(this.showForecast);
  }
}
