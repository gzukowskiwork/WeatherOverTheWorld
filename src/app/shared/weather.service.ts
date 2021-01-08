import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  baseUrl = 'http://api.openweathermap.org/data/2.5/';
  apiKey = 'f966a89e15f5885e8489daa53f4ad98c';
  units = 'metric';

  constructor(private http: HttpClient) {
  }

  getCurrenttWeather(lat: string, lon: string): Observable<object>{
    return this.http.get(
      this.baseUrl + 'weather?lat=' + lat + '&lon=' + lon + '&appid=' + this.apiKey + '&units=' + this.units);
  }

  getForecast(lat: string, lon: string): Observable<object>{
    return this.http.get(
      'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + this.apiKey + '&units=' + this.units);
  }

}
