import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {OSM} from 'ol/source';
import {toStringXY} from 'ol/coordinate';
import {toLonLat} from 'ol/proj';
import Overlay from 'ol/Overlay';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})

export class WorldMapComponent implements OnInit {
  map: Map;
  showForecast = false;
  hdms: string;
  private geojsonUrl = 'https://raw.githack.com/drei01/geojson-world-cities/master/cities.geojson';
  private _showCities: boolean;

  @Input() set showCities(value: boolean){
    this._showCities = value;
    this.updateVisibility();
  }
  get showCities(): boolean{
    return this._showCities;
  }


  @Output() showForecastRequest = new EventEmitter<boolean>();
  @Output() emitCoordinates = new EventEmitter<string>();
  layer: VectorLayer;

  private static createOverlay(container: HTMLElement): Overlay {
    return new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });
  }
  constructor() { }

  ngOnInit(): void {
    this.initializeMap();

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
        url: this.geojsonUrl,
        format: new GeoJSON()
      }),
      visible: false
    });
  }
  updateVisibility(): void{
    this.layer.setVisible(this._showCities);
    console.log(this._showCities);
  }
  private closeCoordinatesPopup(closer: HTMLElement, overlay: Overlay): void {
    closer.onclick = () => {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };
  }

  onShowWeatherForecastClicked(): void{
    this.showForecast = true;

    if (this.showForecast){
    this.showForecastRequest.emit(this.showForecast);
    this.emitCoordinates.emit(this.hdms);
    }
    this.showForecast = false;
  }

  hideWeatherForecast(): void {
    this.showForecast = false;

    if (!this.showForecast){
      this.showForecastRequest.emit(this.showForecast);
      this.emitCoordinates.emit(this.hdms);
    }
  }
}
