import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription, filter, interval, takeUntil } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity,interface';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';
import Chart from 'chart.js/auto';
import { lineChartColors } from 'src/app/utils/configcolorschart';

@Component({
  selector: 'app-take-abreak-chart',
  templateUrl: './take-abreak-chart.component.html',
  styleUrls: ['./take-abreak-chart.component.css'],
})
export class TakeAbreakChartComponent implements OnInit, AfterViewInit {
  destroy$: Subject<void> = new Subject<void>();
  saveData: string[] = [];
  position: number = 0;
  lineChart!: Chart;
  @ViewChild('takebreakchart')
  chartRef!: ElementRef;
  timeInterval: number = 600000;
  barChartLabelName: string = 'TakeBreak Class';
  interactionsPerInterval = Array(12).fill(0);
  barChartXaxisLabels: number[] = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120,
  ];
  borderColors = lineChartColors.borderColors;
  subscription: Subscription = new Subscription();
  constructor(private dataRealTimeService: DataRealTimeService) {}
  ngOnInit(): void {
    const updateInterval$ = interval(this.timeInterval);
    updateInterval$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.lineChart) {
        this.updateChartIntervalPosition();
      } else {
        this.finishIntervalObservable();
      }
      if (this.position >= this.interactionsPerInterval.length) {
        this.dataRealTimeServiceUnscription();
        this.finishIntervalObservable();
      }
    });
  }

  ngAfterViewInit(): void {
    this.initChart();
    this.dataRealTimeService
      .getActivity$()
      .pipe(filter<Activity>((activity) => activity.activityType == 'break'))
      .subscribe((activity: Activity) => {
        this.fetchRealTimeData(activity.activityType);
      });
  }
  initChart() {
    this.lineChart = this.createLineChart(
      this.barChartLabelName,
      this.interactionsPerInterval,
      this.barChartXaxisLabels
    );
  }

  updateChartIntervalPosition() {
    this.position = this.position + 1;
    this.saveData = [];
  }

  fetchRealTimeData(activity: string) {
    this.saveData.push(activity);
    this.updateLineCharts();
  }
  updateLineCharts(): void {
    this.interactionsPerInterval.splice(this.position, 0, this.saveData.length);
    this.lineChart.data.datasets[0].data = this.interactionsPerInterval;
    if (this.position != this.lineChart.data.datasets[0].data.length) {
      this.lineChart.data.datasets[0].data.splice(this.position + 1, 1);
    } else {
      this.position = this.position + 1;
    }
    this.lineChart.update();
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
  finishIntervalObservable() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  dataRealTimeServiceUnscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnDestroy(): void {
    this.finishIntervalObservable();
    this.dataRealTimeServiceUnscription();
  }
}
