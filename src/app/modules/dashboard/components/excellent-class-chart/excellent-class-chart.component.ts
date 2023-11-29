import { Component, OnDestroy, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import {
  Subject,
  Subscription,
  filter,
  interval,
  map,
  takeUntil,
  tap,
} from 'rxjs';
import { Activity } from 'src/app/interfaces/activity,interface';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';
import { SocketService } from 'src/app/services/socket.service';
@Component({
  selector: 'excellent-class-chart',
  templateUrl: './excellent-class-chart.component.html',
  styleUrls: ['./excellent-class-chart.component.css'],
})
export class ExcellentClassChartComponent implements OnInit, OnDestroy {
  lineChart!: Chart;
  time: number = 0;
  saveData: string[] = [];
  chartLabel: string = '';
  private destroy$: Subject<void> = new Subject<void>();
  private subscription: Subscription = new Subscription();
  constructor(private dataRealTimeService: DataRealTimeService) {}
  ngOnInit(): void {
    const updateInterval$ = interval(600000);
    this.subscription = updateInterval$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateLineCharts();
      });
    this.dataRealTimeService
      .getActivity$()
      .pipe(
        tap((res) => console.log(res)),
        filter<Activity>(
          (activity) => activity.activityType == 'excellent class'
        )
      )
      .subscribe((activity: Activity) => {
        this.fetchRealTimeData(activity.activityType);
      });
    this.populateLineCharts();
  }

  populateLineCharts(): void {
    this.lineChart = this.createLineChart('barChart1', 'Excellent Class', []);
  }

  fetchRealTimeData(activity: string): void {
    this.saveData.push(activity);
  }
  updateLineCharts(): void {
    this.time = this.time + 10;

    this.lineChart.data.labels?.push(`${this.time} min`);
    this.lineChart.data.datasets[0].data.push(this.saveData.length);
    this.lineChart.update();
    console.log('FetchRealTime method', this.lineChart.data.datasets[0].data);
    this.saveData = [];
    //this.destroy$.next();
  }
  createLineChart(chartId: string, chartLabel: string, data: number[]): Chart {
    const ctx = document.getElementById(chartId) as HTMLCanvasElement;
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: chartLabel,
            data: [],
            borderColor: 'blue',
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
              display: false,
            },
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
