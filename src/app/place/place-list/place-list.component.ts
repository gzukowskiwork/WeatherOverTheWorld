import { Component, OnInit } from '@angular/core';
import {PlacesRepositoryService} from '../../shared/places-repository.service';
import {Place} from '../../shared/models/place';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {
  public places: Place[];

  constructor(private  repository: PlacesRepositoryService) { }

  ngOnInit(): void {
    this.getAllPlaces();
  }

  getAllPlaces(): void {
    const apiAddress = 'Place';
    this.repository.getPlaces(apiAddress)
      .subscribe(x => {
        this.places = x as Place[];
      });
  }
}
