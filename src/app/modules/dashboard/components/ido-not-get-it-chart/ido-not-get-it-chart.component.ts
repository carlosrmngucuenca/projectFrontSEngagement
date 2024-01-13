import {
  AfterViewInit,
  Component,
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
  selector: 'app-ido-not-get-it-chart',
  templateUrl: './ido-not-get-it-chart.component.html',
  styleUrls: ['./ido-not-get-it-chart.component.css'],
})
export class IDoNotGetItChartComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  barChartName: string = 'barChart1';
  barChartLabelName: string = initChartconf.iDonotGetItLabelName;
  chartLabel: string = '';
  currentPosition: number = 0;
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
  private subscription: Subscription = new Subscription();

  /* Begin*/
  constructor(private dataRealTimeService: DataRealTimeService) {}
  ngOnInit() {
    this.loadPreviousValues();
  }

  ngAfterViewInit() {
    this.initChart();
    this.dataRealTimeService
      .getActivity$()
      .pipe(
        tap((res) => console.log('tap in I do not get it chart logic', res)),
        filter<DashboardActivity>(
          (activity) => activity.activityType == ACTIVITY.iDontGetIt
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
    this.updateLineChartData(this.Interactions);
  }

  updateLineChartData(interactions: number): void {
    if (this.isPositionWithinDataRange()) {
      this.updateDataInterval(interactions);

      this.lineChart.update();
    } else {
      this.endRealTimeUpdates();
    }
  }

  isPositionWithinDataRange(): boolean {
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
              return activity.activityType === ACTIVITY.iDontGetIt;
            });
          }
        )
      )
      .subscribe((data: DashboardActivity[]) => {
        if (data.length > 0) {
          this.previousValues = data[0].historial;
          this.currentPosition = this.previousValues.length;
          console.log(
            'Historial of "I do not get it" activity:',
            this.previousValues
          );
          if (this.isPositionWithinDataRange()) {
            this.interactionsPerInterval.splice(
              0,
              this.previousValues.length,
              ...this.previousValues
            );
            console.log(
              'Carlos "Historial of "I do not get it" activity found.',
              this.interactionsPerInterval
            );

            if (this.currentPosition == this.previousValues.length) {
              /* End Updates*/
            } else {
              this.updateLineChartData(data[0].count);
            }
            this.lineChart.update();
          }
        } else {
          console.log('No "I do not get it" activity found.');
        }
      });
  }

  endRealTimeUpdates() {
    this.dataRealTimeServiceUnsubscription();
  }
  ngOnDestroy() {}
}
