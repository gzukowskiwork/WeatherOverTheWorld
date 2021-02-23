import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {PlacesRepositoryService} from '../../_shared/places-repository.service';
import {Place} from '../../_shared/models/place';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnInit {
  @Input() id: number;
  @Output() hideEvent = new EventEmitter<boolean>();
  public place: Place;

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
      });
  }
}
