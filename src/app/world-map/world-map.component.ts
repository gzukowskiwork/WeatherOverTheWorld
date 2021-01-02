import { Component, OnInit, Input } from '@angular/core';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {OSM} from 'ol/source';

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

  initializeMap(): void{
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
    });
  }
}
