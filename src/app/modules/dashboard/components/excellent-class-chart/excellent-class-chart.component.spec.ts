import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcellentClassChartComponent } from './excellent-class-chart.component';

describe('ExcellentClassChartComponent', () => {
  let component: ExcellentClassChartComponent;
  let fixture: ComponentFixture<ExcellentClassChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExcellentClassChartComponent]
    });
    fixture = TestBed.createComponent(ExcellentClassChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
