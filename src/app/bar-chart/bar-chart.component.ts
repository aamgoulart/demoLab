import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable, range } from 'rxjs';

// import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: [ './bar-chart.component.scss' ],
})
export class BarChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
      },// ajuste para alterar a largura das barras},
      y: {
        min: -100,
      },

    },

    plugins: {
      legend: {
        display: true,
      },
/*       datalabels: {
        anchor: 'end',
        align: 'end'
      } */
    }
  };
  public barChartType: ChartType = 'bar';
/*   public barChartPlugins = [
    DataLabelsPlugin
  ]; */

  public barChartData: ChartData<'bar'> = {
    labels: [1,2,3,4,5,6,7,8,9, 10, 11 , 12, 13, 14, 15, 16, 17, 18, 19, 20],
    datasets: [
      {  data: [ 65, 59, 80, 81, 56, 55, 40 , 30, 25, 20, -10, -20, -40, -50, -20, 10, 35,40, 50, 60]
        , label: 'Sinal A' , barPercentage: 0.09,}
    ],

  };

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];

    this.chart?.update();
  }
}
function list(arg0: Observable<number>): unknown[] | undefined {
  throw new Error('Function not implemented.');
}

