import { Component, OnInit, Input } from '@angular/core';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {OSM} from 'ol/source';
import {degreesToStringHDMS, toStringHDMS} from 'ol/coordinate';
import {toLonLat} from 'ol/proj';

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
    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    const closer = document.getElementById('popup-closer');
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
    this.map.on('singleclick', function(evt) {
      const coordinate = evt.coordinate;
      const hdms = toStringHDMS(toLonLat(coordinate));

      content.innerHTML = '<p> current coordiantes are: </p> <code>' + hdms + '</code>';
    });


  }


}
