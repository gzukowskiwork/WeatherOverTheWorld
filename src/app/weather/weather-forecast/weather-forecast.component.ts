import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LoggingService} from '../../shared/logging.service';
import {CoordinateService} from '../../shared/coordinate.service';
import {WeatherService} from '../../shared/weather.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css'],
  providers: [LoggingService, CoordinateService]
})

export class WeatherForecastComponent implements OnInit, OnChanges {
  title = 'weather forecast';


  public main1: any;
  public temp: number[]=[];
  public temp_min: number[]=[];
  public temp_max: number[]=[];
  public temp_feel: number[]=[];
  public weatherDate: any[]=[];
  public wind: number[]= [];
  public humidity: number[]= [];

  temperatureChartOption: EChartsOption;
  windChartOption: EChartsOption;
  humidityChartOption: EChartsOption;

  @Input() obtainedCoordinates: string;
  constructor(private coordinateService: CoordinateService,
              private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeather();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[this.obtainedCoordinates]){
      this.showCoordinates();
    }
  }

  showCoordinates(): {longitude: string, latitude: string} {
    return this.coordinateService.reverseCoordinatesToLatLon(this.obtainedCoordinates);
  }

  getWeather(): void {
    const lat = this.showCoordinates().longitude;
    const lon = this.showCoordinates().latitude;

    this.weatherService.getForecast(lat, lon)
      .subscribe(x => {
        this.main1 = x as any;
        this.temp = x['list'].map(x=>x.main.temp);
        this.temp_min = x['list'].map(x=>x.main.temp_min);
        this.temp_max = x['list'].map(x=>x.main.temp_max);
        this.temp_feel = x['list'].map(x=>x.main.feels_like);
        this.wind = x['list'].map(x => x.wind.speed);
        this.humidity = x['list'].map(x=>x.main.humidity);
        let dates = x['list'].map(x=>x.dt);

        this.DateConversion(dates);
        this.generateTemperatureChart();
        this.generateWindChart();
        this.generateHumidityChart();
      });

  }


  private DateConversion(dates: any) {
    dates.forEach((x) => {
      let dupa = new Date(x * 1000);
      this.weatherDate.push(dupa.toLocaleDateString(
        'pl', {
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric'
      }));
    });
  }

  private formatTitle(cood: string): string{
    return ' w miejscu: \n' +
      'szerokość WGS84: ' + this.showCoordinates().latitude +
      '\ndługość WGS84: ' + this.showCoordinates().longitude;
  }
  private generateTemperatureChart(): void {
    this.temperatureChartOption = {

      title: {
        text: 'Temperatury' + this.formatTitle(this.obtainedCoordinates)
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['temperatura', 'minimalna', 'maksymalna', 'odczuwalna']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: this.weatherDate,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.temp,
          type: 'line',
          smooth: true,
          color: 'red'
        },
        {
          data: this.temp_feel,
          type: 'line',
          smooth: true,
          color: 'blue'
        }
      ],

    };
  }
  private generateWindChart(): void {
      this.windChartOption = {

        title: {
         text: 'Siła wiatru' + this.formatTitle(this.obtainedCoordinates)
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['temperatura', 'minimalna', 'maksymalna', 'odczuwalna']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.weatherDate,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.wind,
            type: 'line',
            smooth: true,
            color: 'blue'
          },
        ],
      };
  }

  private generateHumidityChart(): void {
    this.humidityChartOption = {
      title: {
        text: 'Wilgotność' + this.formatTitle(this.obtainedCoordinates)
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['temperatura', 'minimalna', 'maksymalna', 'odczuwalna']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: this.weatherDate,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.humidity,
          type: 'line',
          smooth: true,
          color: 'purple'
        }
      ],
    };
  //https://echarts.apache.org/examples/en/editor.html?c=area-stack&theme=light
  }
}
