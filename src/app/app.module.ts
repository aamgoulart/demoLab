import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartComponent } from './chart/chart.component';
import { NgChartsModule } from 'ng2-charts';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import {MatButtonModule} from '@angular/material/button';
import { WebBluetoothModule } from '@manekinekko/angular-web-bluetooth';
import { FormsModule } from '@angular/forms';
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';
@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    BarChartComponent,
    GaugeChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    NgChartsModule,
    MatButtonModule,
    WebBluetoothModule.forRoot({
      enableTracing: true // or false, this will enable logs in the browser's console
    }),
    AppRoutingModule,
    FormsModule
    ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
