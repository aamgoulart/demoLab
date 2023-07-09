import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { default as Annotation } from 'chartjs-plugin-annotation';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {

  message = '';


  constructor(public webSocketService: WebSocketService) {
    Chart.register(Annotation)
    this.webSocketService.connect();
  }


  ngOnInit(): void {
    this.mostrarDados();
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Sinal A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y:
      {
        position: 'left',
        min: 0,
        max: 10
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },

      }
    },

  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  startFunction() {
    const intervalId = setInterval(() => {
      this.pushOne();
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
    }, 30000000);
  }

  public pushOne(): void {


    this.lineChartData.datasets[0].data.push(this.webSocketService.currentData.message!);
    if (this.lineChartData.datasets[0].data.length > 300) {
      this.lineChartData.datasets[0].data.shift();
    }

    this.lineChartData?.labels?.push(`${this.webSocketService.currentData.time}`);
    if (this.lineChartData?.labels?.length! > 301) {
      this.lineChartData?.labels?.shift();
    }

    this.chart?.update();
  }


  mostrarDados() {
    this.startFunction();
    this.sendMessage(this.message);
  }

  sendMessage(message: string) {
    this.webSocketService.sendMessage(message);
  }

  ngOnDestroy() {
    this.webSocketService.close();
  }

}
