import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  initChartconf,
  lineChartColorsSurvey,
} from 'src/app/utils/configchartsettings';
import Chart from 'chart.js/auto';
import { Subscription, tap } from 'rxjs';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';
import { PollEngagementResponse } from 'src/app/interfaces/pollResponses.interface';

@Component({
  selector: 'app-survey-results-chart',
  templateUrl: './survey-results-chart.component.html',
  styleUrls: ['./survey-results-chart.component.css'],
})
export class SurveyResultsChartComponent implements OnInit, AfterViewInit {
  barChartName: string = 'barChart1';
  barChartLabelName: string = initChartconf.surveyResultsLabelName;
  chartLabel: string = '';
  lineChart!: Chart;
  @ViewChild('lineChart')
  chartRef!: ElementRef;
  interactionsPerInterval: number[] = Array(
    initChartconf.numberOfBeansSurvey
  ).fill(0);
  barChartXaxisLabels: string[] = initChartconf.barChartXaxisLabelsSurvey;
  borderColors = lineChartColorsSurvey.borderColors;
  backgroundColors = lineChartColorsSurvey.backgroundColors;
  Interactions: number = 0;
  previousValues: number[] = [];
  historial: number[] = [];
  initData: PollEngagementResponse = {
    cognitive: 0,
    emotional: 0,
    behavioral: 0,
  };
  private subscription: Subscription = new Subscription();
  /* Begin */
  constructor(private dataRealTimeService: DataRealTimeService) {}
  ngOnInit() {
    this.loadPreviousValues();
  }

  ngAfterViewInit() {
    this.initChart(this.initData);
    this.dataRealTimeService
      .getPollEngagementResponseObservable$()
      .pipe(
        tap((res) =>
          console.log('tap in response survey chart chart logic get', res)
        )
      )
      .subscribe((data: PollEngagementResponse) => {
        if (this.lineChart) {
          this.updateChart(data);
        } else {
          this.initChart(data);
        }
      });
  }

  initChart(data: PollEngagementResponse) {
    this.lineChart = this.createLineChart(
      this.barChartLabelName,
      data,
      this.barChartXaxisLabels
    );
  }

  createLineChart(
    chartLabel: string,
    data: PollEngagementResponse,
    barChartXaxisLabels: string[]
  ): Chart {
    const chartCanvas = this.chartRef.nativeElement.getContext(
      '2d'
    ) as HTMLCanvasElement;
    const PollEngagementResponseData: PollEngagementResponse =
      data || this.initData;
    return new Chart(chartCanvas, {
      type: 'bar',
      data: {
        labels: barChartXaxisLabels,
        datasets: [
          {
            label: chartLabel,
            data: [
              PollEngagementResponseData.cognitive,
              PollEngagementResponseData.emotional,
              PollEngagementResponseData.behavioral,
            ],
            backgroundColor: this.backgroundColors,
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
            ticks: {},
          },
        },
      },
    });
  }

  updateChart(newData: PollEngagementResponse) {
    if (!this.lineChart) {
      //console.error('Chart element not found or not initialized.');
      return;
    }
    this.lineChart.data.datasets[0].data = [
      newData.cognitive,
      newData.emotional,
      newData.behavioral,
    ];

    this.lineChart.update();
    //console.log('hola estoy actualisando emotion chart', newData);
  }

  loadPreviousValues() {
    this.dataRealTimeService
      .getDashboardPollEngagementResponse()
      .pipe(/*tap((res) => console.log('tap in emotions chart logic get', res))*/)
      .subscribe((data: PollEngagementResponse) => {
        if (data != null) {
          this.updateChart(data);
        } else {
          //console.log('No "emotions" activity found.');
        }
      });
  }
}
