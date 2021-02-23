import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Place} from './models/place';


@Injectable({
  providedIn: 'root'
})
export class PlacesRepositoryService {
  baseUrl = 'https://localhost:5001';
  _deleteOperationSuccesful: Subject<boolean> = new Subject<boolean>();
  _createOperationSuccessful: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  get deleteOperationSuccessful(): Observable<boolean>{
    return this._deleteOperationSuccesful.asObservable();
  }

  get createOperationSuccessful(): Observable<boolean>{
    return this._createOperationSuccessful.asObservable();
  }

  getPlaces(route: string): Observable<object>{
    return this.http.get<Place>(this.createRoute(this.baseUrl, route));
  }

  getPlaceById(route: string, id: number): Observable<object>{
    return this.http.get<Place>(this.createRouteWithParam(this.baseUrl, route, id));
  }

  deletePlace(route: string, id: number): Observable<object>{
    return this.http.delete(this.createRouteWithParam(this.baseUrl, route, id));
  }

  createPlace(route: string, place: Place): Observable<object>{
    return this.http.post(this.createRoute(this.baseUrl, route), place);
  }

  private createRoute(baseAddress: string, route: string): string {
    return `${baseAddress}/${route}`;
  }

  private createRouteWithParam(baseAddress: string, route: string, id): string {
    return `${baseAddress}/${route}/${id}`;
  }
}
