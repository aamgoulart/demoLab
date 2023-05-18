import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { default as Annotation } from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  private newLabel? = 'New label';

  constructor() {
    Chart.register(Annotation)
  }

  ngOnInit(): void {
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {

        data: [ 65, 59, 80, 81, 56, 55, 40 , 30, 25, 20, -10, -20, -40, -50, -20, 10, 35,40, 50, 60],
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
    labels: [1,2,3,4,5,6,7,8,9, 10, 11 , 12, 13, 14, 15, 16, 17, 18, 19, 20],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y:
        {
          position: 'left',
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

  generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }
  randomizarPorTempo() {
    console.log(this.lineChartData.datasets)
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.lineChartData.datasets.forEach((x, i) => {
        const num = Math.floor(Math.random() * 26) + 50;;
        x.data.push(num);
        console.log(this.lineChartData.datasets)

     });
     this.lineChartData?.labels?.push(`Label ${ this.lineChartData.labels.length }`);

     this.chart?.update();
     setTimeout(this.randomizarPorTempo, 5000);
    }, 3000);

  }

  startFunction() {
    const intervalId = setInterval(() => {
      this.pushOne();
    }, 500);

    // Parar de repetir a função após um determinado tempo (por exemplo, 30 segundos)
    setTimeout(() => {
      clearInterval(intervalId);
    }, 30000000);
  }

  public pushOne(): void {
    const num = Math.floor(Math.random() * 26) + 50;;

    console.log(this.lineChartData.datasets)
    this.lineChartData.datasets.forEach((x, i) => {
       x.data.push(num);
   });
    this.lineChartData?.labels?.push(`${ this.lineChartData.labels.length }`);

    this.chart?.update();
  }

  removeOne () {
    this.lineChartData.datasets.forEach((x, i) => {
      x.data.shift();
    });
   this.lineChartData?.labels?.shift();

   this.chart?.update();
  }

  mostrarDados() {
    this.startFunction();
    this.iniciaRetirada();
  }

  iniciaRetirada() {
    const intervalId = setInterval(() => {
      this.removeOne();
    }, 1000);

    // Parar de repetir a função após um determinado tempo (por exemplo, 30 segundos)
    setTimeout(() => {
      clearInterval(intervalId);
    }, 30000000);
  }

}
