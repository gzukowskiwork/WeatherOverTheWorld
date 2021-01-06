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
  geojsonCities: VectorLayer;
  tileLayer: TileLayer;
  @Input() showCities: boolean;
  pipa = true;
  @Output() showForecastRequest = new EventEmitter<boolean>();
  @Output() emitujWspolrzedne = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    const content = document.getElementById('popup-content');
    const container = document.getElementById('popup');
    const closer = document.getElementById('popup-closer');

    const overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    closer.onclick = () => {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };

    this.map = new Map({
      layers: this.dupa(),
      overlays: [overlay],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
    });

    this.map.on('singleclick',  (evt) => {
      const coordinate = evt.coordinate;
      this.hdms = toStringXY(toLonLat(coordinate), 5);

      content.innerHTML = '<p> Current coordinates are: </p> <code>' + this.hdms + '</code>';
      overlay.setPosition(coordinate);
    });
  }

  onShowWeatherForecastClicked(): void{
    this.showForecast = !this.showForecast;
    this.showForecastRequest.emit(this.showForecast);
    this.emitujWspolrzedne.emit(this.hdms);
  }
  toggle(): boolean{
    if(this.showCities){
      this.pipa = true;
      return this.pipa;
    } else {
      this.pipa = false;
      return this.pipa;
    }
  }
  dupa(): any{
    if (this.toggle()) {
      this.geojsonCities = new VectorLayer({
        source: new VectorSource({
          url: 'https://raw.githack.com/gzukowskiwork/WeatherOverTheWorld/main/src/app/geojson-data/poland-cities.geojson',
          format: new GeoJSON()
        }),
      });
      this.tileLayer =  new TileLayer({
        source: new OSM()
      });
      return [this.tileLayer, this.geojsonCities];
    }else {
      this.tileLayer =  new TileLayer({
        source: new OSM()
      });
      return [this.tileLayer];
    }
  }

}
