import {Component, OnInit} from '@angular/core';
import {PlacesRepositoryService} from '../../shared/places-repository.service';
import {Place} from '../../shared/models/place';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {
  public places: Place[];
  placeId: number;
  lastId: number;
  constructor(private  repository: PlacesRepositoryService) { }

  ngOnInit(): void {
    this.getAllPlaces();
  }



  getAllPlaces(): void {
    const apiAddress = 'Place';
    this.repository.getPlaces(apiAddress)
      .subscribe(x => {
        this.places = x as Place[];
        this.getLastId();
      });
  }

  setId(id: number): void {
    this.placeId = id;
  }

  getLastId(): void{
    this.lastId = this.places[this.places.length - 1].id;
  }

  delete(id: number): void {
    //TODO: make it work like it should work
    const apiAddress = 'Place';
    this.repository.deletePlace(apiAddress, id).subscribe();
  }
}
