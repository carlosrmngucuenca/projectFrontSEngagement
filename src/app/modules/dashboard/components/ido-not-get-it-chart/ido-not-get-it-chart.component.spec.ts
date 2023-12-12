import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IDoNotGetItChartComponent } from './ido-not-get-it-chart.component';

describe('IDoNotGetItChartComponent', () => {
  let component: IDoNotGetItChartComponent;
  let fixture: ComponentFixture<IDoNotGetItChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IDoNotGetItChartComponent]
    });
    fixture = TestBed.createComponent(IDoNotGetItChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
