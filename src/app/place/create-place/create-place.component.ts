import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Place} from '../../_shared/models/place';
import {CoordinateService} from '../../_shared/coordinate.service';
import {PlacesRepositoryService} from '../../_shared/places-repository.service';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.component.html',
  styleUrls: ['./create-place.component.css']
})
export class CreatePlaceComponent implements OnInit, OnChanges {
  placeForm: FormGroup;
  place: Place;
  value;
  @Output() showEvent = new EventEmitter<boolean>();
  @Input() coordinates: string;

  constructor(private coordinateService: CoordinateService,
              private repository: PlacesRepositoryService) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.initializeForm();
  }


  showCoordinates(): {longitude: string, latitude: string}{
    return this.coordinateService.reverseCoordinatesToLatLon(this.coordinates);
  }

  private initializeForm(): void {
    this.placeForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      longitude: new FormControl(this.showCoordinates().latitude, Validators.required),
      latitude: new FormControl(this.showCoordinates().longitude, Validators.required)
    });
  }

  onSubmit(): void {
    this.value = this.placeForm.value;
    this.createPlace(this.value);
    this.showEvent.emit(false);
  }

  createPlace(dupa: any): void {
    console.log(dupa)
    const apiAddress = 'Place';
    this.repository.createPlace(apiAddress, dupa)
      .subscribe(x => {
        this.place = x as Place;
        this.repository._createOperationSuccessful.next(true);
      });
  }
  clear(): void {
    this.placeForm.reset();
  }

  onHideComponent(): void {
    this.showEvent.emit(false);
  }
}
