import {Component, OnInit, Output} from '@angular/core';
import {PlacesRepositoryService} from '../../_shared/places-repository.service';
import {Place} from '../../_shared/models/place';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {
  public places: Place[] = [];
  placeIds: number[] = [];
  placeId: number;
  showEdit = false;
  showDetails = false;
  isFetching = false;
  deleteOperationSuccessfulSubscription: Subscription;
  createOperationSuccessfulSubscription: Subscription;
  constructor(private  repository: PlacesRepositoryService) { }

  ngOnInit(): void {
    this.getAllPlaces();

    this.deleteOperationSuccessfulSubscription = this.repository.deleteOperationSuccessful.subscribe(
      isSuccessful => {
        if (isSuccessful === true) {
          this.getAllPlaces();
        }else{
          // todo add error handling
        }
      }
    );

    this.createOperationSuccessfulSubscription = this.repository.createOperationSuccessful.subscribe(
      isSuccessful => {
        if (isSuccessful === true) {
          this.getAllPlaces();
        } else {
          // todo add error handling
        }
      }
    );


  }

  getAllPlaces(): void {
    const apiAddress = 'Place';
    this.isFetching = true;
    this.repository.getPlaces(apiAddress)
      .pipe(
        map(response => {
          const placeArray: Place[] = [];
          for (const key in response){
            if (response.hasOwnProperty(key)){
              placeArray.push(response[key]);
            }
          }
          return placeArray;
        })
      )
      .subscribe(x => {
        this.isFetching = false;
        this.places = x;

        this.populateIds();
        // todo add error handling
      });
  }

  setIdDetails(id: number): void {
    this.showDetails = true;
    this.showEdit = false;
    this.placeId = id;
  }

  delete(id: number): void {
    const apiAddress = 'Place';
    this.repository.deletePlace(apiAddress, id).subscribe(
      x => {
        this.repository._deleteOperationSuccesful.next(true);
      }
      // todo add error handling
    );
  }

  hideEventHandler($event: boolean): void {
    this.showDetails = $event;
    this.showEdit = $event;
  }

  populateIds(): void{
    for (const place of this.places){
      console.log(place.id);
      this.placeIds.push(place.id);
    }
  }

  setIdEdit(id: number): void {
    this.showEdit = true;
    this.showDetails = false;
    this.placeId = id;
  }
}
