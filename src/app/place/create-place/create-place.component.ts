import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Place} from '../../shared/models/place';
import {WeatherService} from '../../shared/weather.service';
import {CoordinateService} from '../../shared/coordinate.service';
import {PlacesRepositoryService} from '../../shared/places-repository.service';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.component.html',
  styleUrls: ['./create-place.component.css']
})
export class CreatePlaceComponent implements OnInit, OnChanges {
  placeForm: FormGroup;
  place: Place;
  value;
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
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'longitude': new FormControl(this.showCoordinates().latitude, Validators.required),
      'latitude': new FormControl(this.showCoordinates().longitude, Validators.required)
    });
  }

  onSubmit(): void {
    console.log(this.placeForm.value);
    this.value = this.placeForm.value;
    this.createPlace();
  }

  createPlace() {
    const apiAddress = 'Place';
    this.repository.createPlace(apiAddress, this.value)
      .subscribe(x => {
        this.place = x as Place;
      });
  }
  clear(): void {
    this.placeForm.reset();
  }
}
