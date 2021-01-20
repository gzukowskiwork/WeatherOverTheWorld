import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Place} from '../../shared/models/place';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.component.html',
  styleUrls: ['./create-place.component.css']
})
export class CreatePlaceComponent implements OnInit {
  placeForm: FormGroup;
  place: Place;
  constructor() { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.placeForm = new FormGroup({
      'Nazwa': new FormControl(null, Validators.required),
      'Opis': new FormControl(null, Validators.required),
      'X': new FormControl(null, Validators.required),
      'Y': new FormControl(null, Validators.required),
    });
  }

  onSubmit() {

  }
}
