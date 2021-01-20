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
import { PlaceComponent } from './place/place.component';

import {NgxEchartsModule} from 'ngx-echarts'
import { WeatherComponent } from './weather/weather.component';
import { CityComponent } from './city/city.component';
import { PlaceDetailComponent } from './place/place-detail/place-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreatePlaceComponent } from './place/create-place/create-place.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherPopupComponent,
    WorldMapComponent,
    HeaderComponent,
    WeatherForecastComponent,
    PlaceListComponent,
    CityDetailComponent,
    WeatherComponent,
    PlaceComponent,
    CityComponent,
    PlaceDetailComponent,
    CreatePlaceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
