import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Feature, Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {OSM} from 'ol/source';
import {toStringXY} from 'ol/coordinate';
import {fromLonLat, toLonLat} from 'ol/proj';
import Overlay from 'ol/Overlay';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Style from 'ol/style/Style';
import {Icon} from 'ol/style';
import {Point} from 'ol/geom';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})

export class WorldMapComponent implements OnInit, AfterViewInit {
  map: Map;
  showForecast = false;
  hdms: string;
  private geojsonUrl = 'https://raw.githack.com/drei01/geojson-world-cities/master/cities.geojson';
  @Input() showCities: boolean = false;
  @Output() showForecastRequest = new EventEmitter<boolean>();
  @Output() emitCoordinates = new EventEmitter<string>();


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
  ngAfterViewInit(): void {
    console.log(this.showCities);
  }


  initializeMap(): void {
    const content = document.getElementById('popup-content');
    const container = document.getElementById('popup');
    const closer = document.getElementById('popup-closer');

    const overlay = WorldMapComponent.createOverlay(container);

    this.closeCoordinatesPopup(closer, overlay);

    this.setMapProperties(overlay);
    // this.warstwa = this.geoJsonVectorLayer();
    // this.map.addLayer(this.warstwa);


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
      // content.innerHTML = '<p> Current coordinates are: </p> <code>' + this.hdms + '</code>';
      overlay.setPosition(coordinate);
    });
  }

  private geoJsonVectorLayer(): VectorLayer {
    return new VectorLayer({
      source: new VectorSource({
        url: this.geojsonUrl,
        format: new GeoJSON()
      })
    });
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
  }

  hideWeatherForecast(): void {
    this.showForecast = false;

    if (!this.showForecast){
      this.showForecastRequest.emit(this.showForecast);
      this.emitCoordinates.emit(this.hdms);
    }
  }
}
