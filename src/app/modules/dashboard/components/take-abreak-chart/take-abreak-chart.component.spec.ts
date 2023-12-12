import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeAbreakChartComponent } from './take-abreak-chart.component';

describe('TakeAbreakChartComponent', () => {
  let component: TakeAbreakChartComponent;
  let fixture: ComponentFixture<TakeAbreakChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TakeAbreakChartComponent]
    });
    fixture = TestBed.createComponent(TakeAbreakChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
