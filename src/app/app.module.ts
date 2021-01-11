import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { WeatherPopupComponent } from './weather/weather-popup/weather-popup.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { HeaderComponent } from './header/header.component';
import { WeatherForecastComponent } from './weather/weather-forecast/weather-forecast.component';
import { PlaceListComponent } from './place/place-list/place-list.component';
import { CityDetailComponent } from './city/city-detail/city-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherPopupComponent,
    WorldMapComponent,
    HeaderComponent,
    WeatherForecastComponent,
    PlaceListComponent,
    CityDetailComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
