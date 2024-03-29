import {
  Component,
  AfterViewInit,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { Subscription, filter, map, tap } from 'rxjs';
import { DashboardActivity } from 'src/app/interfaces/activity,interface';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';
import { lineChartColors } from 'src/app/utils/configchartsettings';
import { initChartconf } from 'src/app/utils/configchartsettings';
import { ACTIVITY } from 'src/app/modules/student/enums/activity.enum';
@Component({
  selector: 'app-sleep-chart',
  templateUrl: './sleep-chart.component.html',
  styleUrls: ['./sleep-chart.component.css'],
})
export class SleepChartComponent implements OnInit, OnDestroy, AfterViewInit {
  barChartName: string = 'barChart1';
  barChartLabelName: string = initChartconf.sleepLabelName;
  chartLabel: string = '';
  currentPosition: number = 0;
  checkPosition: number = 0;
  lineChart!: Chart;
  @ViewChild('lineChart')
  chartRef!: ElementRef;
  interactionsPerInterval: number[] = Array(initChartconf.numberOfBeans).fill(
    0
  );
  barChartXaxisLabels = initChartconf.barChartXaxisLabels;
  borderColors = lineChartColors.borderColors;
  Interactions: number = 0;
  previousValues: number[] = [];
  historial: number[] = [];
  private subscription: Subscription = new Subscription();
  private localStorageKeyPosition = 'IntervalPosition';

  /* Begin */
  constructor(private dataRealTimeService: DataRealTimeService) {}
  ngOnInit() {
    this.loadPreviousValues();
  }

  ngAfterViewInit() {
    this.initChart();
    this.dataRealTimeService
      .getActivity$()
      .pipe(
        //tap((res) => console.log('tap in sleep chart logic', res)),
        filter<DashboardActivity>(
          (activity) => activity.activityType == ACTIVITY.sleep
        )
      )
      .subscribe((activity: DashboardActivity) => {
        this.fetchRealTimeData(activity);
      });
  }
  initChart() {
    this.lineChart = this.createLineChart(
      this.barChartLabelName,
      this.interactionsPerInterval,
      this.barChartXaxisLabels
    );
  }

  fetchRealTimeData(activity: DashboardActivity): void {
    this.Interactions = activity.count;
    this.currentPosition = activity.historial.length;
    this.historial = activity.historial;
    if (this.isVectorLengthReached()) {
      /* End Updates*/
      //console.log('end updates');
    } else {
      this.updateLineChartData(this.Interactions);
    }
  }

  updateLineChartData(interactions: number): void {
    if (this.isPositionWithinDataRange()) {
      this.updateDataInterval(interactions);
      this.lineChart.update();
    } else {
      this.endRealTimeUpdates();
    }
  }

  isVectorLengthReached(): boolean {
    if (this.currentPosition == this.interactionsPerInterval.length) {
      this.interactionsPerInterval.splice(
        0,
        this.historial.length,
        ...this.historial
      );
      this.lineChart.update();
      return true;
    } else {
      return false;
    }
  }

  isPositionWithinDataRange(): boolean {
    // console.log(
    //   'el tamano del vector de la grafica sleep-chart',
    //   this.lineChart.data.datasets[0].data.length
    // );
    return this.currentPosition <= this.lineChart.data.datasets[0].data.length;
  }
  updateDataInterval(interactions: number) {
    this.lineChart.data.datasets[0].data[this.currentPosition] = interactions;
  }
  createLineChart(
    chartLabel: string,
    data: number[],
    barChartXaxisLabels: number[]
  ): Chart {
    const chartCanvas = this.chartRef.nativeElement.getContext(
      '2d'
    ) as HTMLCanvasElement;
    return new Chart(chartCanvas, {
      type: 'bar',
      data: {
        labels: barChartXaxisLabels,
        datasets: [
          {
            label: chartLabel,
            data: data,
            borderColor: this.borderColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
            },
          },
        },
      },
    });
  }

  dataRealTimeServiceUnsubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadPreviousValues() {
    this.dataRealTimeService
      .getDashboardActivities()
      .pipe(
        map<DashboardActivity[], DashboardActivity[]>(
          (activities: DashboardActivity[]) => {
            return activities.filter((activity: DashboardActivity) => {
              return activity.activityType === ACTIVITY.sleep;
            });
          }
        )
      )
      .subscribe((data: DashboardActivity[]) => {
        if (data.length > 0) {
          this.previousValues = data[0].historial;
          //console.log('Historial of "sleep" activity:', this.previousValues);
          this.currentPosition = this.previousValues.length;
          if (this.isPositionWithinDataRange()) {
            this.interactionsPerInterval.splice(
              0,
              this.previousValues.length,
              ...this.previousValues
            );
            // console.log(
            //   'Se ejecuta  "isPositionWithinDataRange"',
            //   this.interactionsPerInterval
            // );

            if (this.currentPosition == this.interactionsPerInterval.length) {
              /* End Updates*/
            } else {
              this.updateLineChartData(data[0].count);
            }
            this.lineChart.update();
          }
        } else {
          //console.log('No "sleep" activity found.');
        }
      });
  }

  endRealTimeUpdates() {
    this.dataRealTimeServiceUnsubscription();
  }
  ngOnDestroy() {}
}
