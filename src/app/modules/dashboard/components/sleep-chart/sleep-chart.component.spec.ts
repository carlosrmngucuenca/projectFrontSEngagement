import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepChartComponent } from './sleep-chart.component';

describe('SleepChartComponent', () => {
  let component: SleepChartComponent;
  let fixture: ComponentFixture<SleepChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SleepChartComponent]
    });
    fixture = TestBed.createComponent(SleepChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
