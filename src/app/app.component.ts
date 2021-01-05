import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  iGetBool: boolean;
  wspol: string;

  onWeatherForecastRequested(wartosc: any): void {
    //console.log(wartosc);
    this.iGetBool = wartosc;
  }

  onEmitujWspolrzedneRequest(wspolrzedne: string): void {
    //console.log(wspolrzedne);
    this.wspol = wspolrzedne;
  }
}
