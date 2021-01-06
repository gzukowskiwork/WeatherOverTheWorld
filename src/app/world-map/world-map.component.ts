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
  private geojsonUrl = 'https://raw.githack.com/gzukowskiwork/WeatherOverTheWorld/main/src/app/geojson-data/poland-cities.geojson';

  @Input() showCities: boolean;
  @Output() showForecastRequest = new EventEmitter<boolean>();
  @Output() emitCoordinates = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.initializeMap();

  }

  initializeMap(): void {
    const content = document.getElementById('popup-content');
    const container = document.getElementById('popup');
    const closer = document.getElementById('popup-closer');

    const overlay = this.createOverlay(container);

    this.closeCoordinatesPopup(closer, overlay);

    this.setMapProperties(overlay);

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

      content.innerHTML = '<p> Current coordinates are: </p> <code>' + this.hdms + '</code>';
      overlay.setPosition(coordinate);
    });
  }

  private geoJsonVectorLayer(): VectorLayer {
    const geo = new VectorLayer({
      source: new VectorSource({
        url: this.geojsonUrl,
        format: new GeoJSON()
      }),

    });
    return geo;
  }

  private closeCoordinatesPopup(closer: HTMLElement, overlay: Overlay): void {
    closer.onclick = () => {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };
  }

  private createOverlay(container: HTMLElement): Overlay {
    const overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });
    return overlay;
  }

  onShowWeatherForecastClicked(): void{
    this.showForecast = true;

    if (this.showForecast){
    this.showForecastRequest.emit(this.showForecast);
    this.emitCoordinates.emit(this.hdms);
    }
  }

  hideWeatherForecast(): void {
    this.showForecast = false;

    if (!this.showForecast){
      this.showForecastRequest.emit(this.showForecast);
      this.emitCoordinates.emit(this.hdms);
    }
  }


}
