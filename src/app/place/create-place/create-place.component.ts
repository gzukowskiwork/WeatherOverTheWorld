import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Place} from '../../shared/models/place';
import {WeatherService} from '../../shared/weather.service';
import {CoordinateService} from '../../shared/coordinate.service';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.component.html',
  styleUrls: ['./create-place.component.css']
})
export class CreatePlaceComponent implements OnInit, OnChanges {
  placeForm: FormGroup;
  place: Place;
  @Input() coordinates: string;

  constructor(private coordinateService: CoordinateService) { }

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
      'Nazwa': new FormControl(null, Validators.required),
      'Opis': new FormControl(null, Validators.required),
      'X': new FormControl(this.showCoordinates().latitude, Validators.required),
      'Y': new FormControl(this.showCoordinates().longitude, Validators.required),
    });
  }

  onSubmit(): void {
  }
}
