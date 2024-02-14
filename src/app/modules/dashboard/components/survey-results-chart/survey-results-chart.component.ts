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
import { Subscription } from 'rxjs';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';

@Component({
  selector: 'app-survey-results-chart',
  templateUrl: './survey-results-chart.component.html',
  styleUrls: ['./survey-results-chart.component.css'],
})
export class SurveyResultsChartComponent
  implements OnInit, OnDestroy, AfterViewInit
{
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
  private subscription: Subscription = new Subscription();
  /* Begin */
  constructor(private dataRealTimeService: DataRealTimeService) {}
  ngOnInit() {
    //this.loadPreviousValues();
  }

  ngAfterViewInit() {
    this.initChart();
    this.dataRealTimeService;
  }

  initChart() {
    this.lineChart = this.createLineChart(
      this.barChartLabelName,
      this.interactionsPerInterval,
      this.barChartXaxisLabels
    );
  }

  fetchRealTimeData(activity: number[]): void {}

  createLineChart(
    chartLabel: string,
    data: number[],
    barChartXaxisLabels: string[]
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
            data: [3, 2, 4],
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

  ngOnDestroy() {}
}
