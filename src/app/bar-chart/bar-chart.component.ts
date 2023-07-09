import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable, range } from 'rxjs';
import { WebSocketService } from '../web-socket.service';

// import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: [ './bar-chart.component.scss' ],
})
export class BarChartComponent implements OnInit, OnDestroy {

  constructor(public webSocketService: WebSocketService) {
    this.webSocketService.connect();
  }


  ngOnDestroy() {
    this.webSocketService.close();
  }


  ngOnInit(): void {
    this.sendMessage("");
    this.startFunction();
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
      },// ajuste para alterar a largura das barras},
      y: {
      },

    },

    plugins: {
      legend: {
        display: true,
      },
    }
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {  data: [ ]
        , label: 'Sinal A' , barPercentage: 0.09,}
    ],

  };

  sendMessage(message: string) {
    this.webSocketService.sendMessage(message);
  }

  adicionaNovoElemento(): void {
   this.barChartData.datasets[0].data.push(this.webSocketService.valorAtual.message);

   if (this.barChartData.datasets[0].data.length> 300) {
    this.barChartData.datasets[0].data.shift();
   }

    this.barChartData?.labels?.push(`${ this.webSocketService.valorAtual.time }`);
    if (this.barChartData?.labels?.length! > 301) {
      this.barChartData?.labels?.shift();
    }

    this.chart?.update();
  }

  startFunction() {
    const intervalId = setInterval(() => {
      this.adicionaNovoElemento();
    }, 10);

    setTimeout(() => {
      clearInterval(intervalId);
    }, 30000000);
  }

  
}

