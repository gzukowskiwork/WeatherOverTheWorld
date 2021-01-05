import { Component, OnInit } from '@angular/core';
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

    const geojsonCities = new VectorLayer({
      source: new VectorSource({
        url: '',
        format: new GeoJSON()
      })
    });

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }), geojsonCities],
      overlays: [overlay],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
    });




    this.map.on('singleclick',  (evt) => {
      const coordinate = evt.coordinate;
      const hdms = toStringXY(toLonLat(coordinate), 5);

      content.innerHTML = '<p> Current coordinates are: </p> <code>' + hdms + '</code>';
      overlay.setPosition(coordinate);
    });
  }


}
