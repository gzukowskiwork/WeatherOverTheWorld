import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {PlacesRepositoryService} from '../../_shared/places-repository.service';
import {Place} from '../../_shared/models/place';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {CoordinateService} from '../../_shared/coordinate.service';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnInit {
  @Input() id: number;
  @Output() hideEvent = new EventEmitter<boolean>();
  public place: Place;
  editPlaceForm: FormGroup;

  constructor(private repository: PlacesRepositoryService) { }

  ngOnInit(): void {
    this.getPlaceById(this.id);
  }

  onHideComponent(): void {
    this.hideEvent.emit(false);
  }

  getPlaceById(id): void {
    const apiAddress = 'Place';
    this.repository.getPlaceById(apiAddress, id)
      .subscribe(x => {
        this.place = x as Place;
        this.initializeForm();
      });
  }

  private initializeForm(): void {
    this.editPlaceForm = new FormGroup({
      name: new FormControl(this.place.name),
      description: new FormControl(this.place.description),
      longitude: new FormControl(this.place.longitude),
      latitude: new FormControl(this.place.latitude)
    });
  }

  onSubmit() {

  }
}
