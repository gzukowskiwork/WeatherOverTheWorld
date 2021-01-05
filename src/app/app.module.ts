import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WeatherPopupComponent } from './weather/weather-popup/weather-popup.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { HeaderComponent } from './header/header.component';
import { WeatherForecastComponent } from './weather/weather-forecast/weather-forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherPopupComponent,
    WorldMapComponent,
    HeaderComponent,
    WeatherForecastComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
