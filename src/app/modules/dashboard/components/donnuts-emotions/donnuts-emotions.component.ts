import {
  Component,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import Chart, { ChartOptions } from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { Emotion } from 'src/app/interfaces/emotion.interface';
import { charDonnutColors } from 'src/app/utils/configcolorschart';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';

@Component({
  selector: 'app-donnuts-emotions',
  templateUrl: './donnuts-emotions.component.html',
  styleUrls: ['./donnuts-emotions.component.css'],
})
export class DonnutsEmotionsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  chartType: string = 'doughnut';
  donnutChartLabels: string[] = [
    'Surprised',
    'Afraid',
    'Angry',
    'Sad',
    'Happy',
  ];
  donnutChartLabelName: string = 'Emotion';
  emotionsDataSubscription: Subscription = new Subscription();
  backgroundColors = charDonnutColors.backgroundColors;
  borderColors = charDonnutColors.borderColors;
  emotionsChart!: Chart;
  @ViewChild('emotionsChart')
  chartRef!: ElementRef;
  initData: Emotion = {
    _id: '',
    surprised: 0,
    afraid: 0,
    angry: 0,
    sad: 0,
    happy: 0,
  };
  constructor(private dataRealTimeService: DataRealTimeService) {}
  ngOnInit() {}

  ngAfterViewInit() {
    this.initChart(this.initData);
    this.emotionsDataSubscription = this.dataRealTimeService
      .getEmotionsDataObservable$()
      .subscribe((newData: Emotion) => {
        if (this.emotionsChart) {
          this.updateChart(newData);
        } else {
          this.initChart(newData);
        }
      });
  }

  initChart(data: Emotion) {
    const chartCanvas = this.chartRef.nativeElement.getContext(
      '2d'
    ) as HTMLCanvasElement;
    this.emotionsChart = this.createChart(chartCanvas, data);
  }
  createChart(chartCanvas: HTMLCanvasElement, data: Emotion): Chart {
    const emotionsData = data || this.initData;
    if (this.emotionsChart) {
      this.emotionsChart.destroy();
    }
    return new Chart(chartCanvas, {
      type: 'doughnut',
      data: {
        labels: this.donnutChartLabels,
        datasets: [
          {
            label: this.donnutChartLabelName,
            data: [
              emotionsData.surprised,
              emotionsData.afraid,
              emotionsData.angry,
              emotionsData.sad,
              emotionsData.happy,
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
        plugins: {
          legend: { position: 'right' },
        },
      } as ChartOptions,
    });
  }

  updateChart(newData: Emotion) {
    if (!this.emotionsChart) {
      console.error('Chart element not found or not initialized.');
      return;
    }
    this.emotionsChart.data.datasets[0].data = [
      newData.surprised,
      newData.afraid,
      newData.angry,
      newData.sad,
      newData.happy,
    ];

    this.emotionsChart.update();
    console.log('hola estoy actualisando emotion chart', newData);
  }
  ngOnDestroy() {}
}
