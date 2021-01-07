import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PlacesRepositoryService {

  baseUrl = 'https://localhost:5001';
  constructor(private http: HttpClient) { }

  getPlaces (route: string){
    return this.http.get(this.createRoute(this.baseUrl, route));
  }

  private createRoute (baseAddress: string, route: string) {
    return `${baseAddress}/${route}`;
  }


}
