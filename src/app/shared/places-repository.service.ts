import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PlacesRepositoryService {
  baseUrl = 'https://localhost:5001';
  constructor(private http: HttpClient) { }

  getPlaces(route: string): Observable<object>{
    return this.http.get(this.createRoute(this.baseUrl, route));
  }

  getPlaceById(route: string, id: number): Observable<object>{
    return this.http.get(this.createRouteWithParam(this.baseUrl, route, id));
  }

  deletePlace(route: string, id: number): Observable<object>{
    return this.http.delete(this.createRouteWithParam(this.baseUrl, route, id));
  }

  private createRoute(baseAddress: string, route: string): string {
    return `${baseAddress}/${route}`;
  }

  private createRouteWithParam(baseAddress: string, route: string, id): string {
    return `${baseAddress}/${route}/${id}`;
  }
}
