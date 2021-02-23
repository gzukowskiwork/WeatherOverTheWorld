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
import {CoordinateService} from '../_shared/coordinate.service';

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
  feature: string;

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
    this.menuService.featureSelected
      .subscribe(
        (featureSelected: string) => {
          this.feature = featureSelected;
        }
      );
  }


  initializeMap(): void {

    const container = document.getElementById('popup');
    const closer = document.getElementById('popup-closer');
    const content = document.getElementById('popup-content');
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
        this.hdms = toStringXY(toLonLat(coordinate), 6);
        overlay.setPosition(coordinate);
        content.innerHTML = '<p>Współrzędne kliknięcia: </p><code>' + this.hdms + '</code>';
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
    this.coordinateService.showCoordsFromService.next(true);
    this.coordinateService.coordsFromService.next(this.hdms);
  }

  hideWeatherForecast(): void {
    this.showForecast = false;
    this.coordinateService.showCoordsFromService.next(false);
  }
}
