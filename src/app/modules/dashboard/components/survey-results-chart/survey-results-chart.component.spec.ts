import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyResultsChartComponent } from './survey-results-chart.component';

describe('SurveyResultsChartComponent', () => {
  let component: SurveyResultsChartComponent;
  let fixture: ComponentFixture<SurveyResultsChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyResultsChartComponent]
    });
    fixture = TestBed.createComponent(SurveyResultsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
