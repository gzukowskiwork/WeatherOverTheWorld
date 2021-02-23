import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Place} from '../../_shared/models/place';
import {PlacesRepositoryService} from '../../_shared/places-repository.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit, OnChanges {
  public place: Place;
  @Input() id: number;

  constructor(private repository: PlacesRepositoryService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getPlaceById(this.id);
  }

  getPlaceById(id): void {
    const apiAddress = 'Place';
    this.repository.getPlaceById(apiAddress, id)
      .subscribe(x => {
        this.place = x as Place;
      });
  }
}
