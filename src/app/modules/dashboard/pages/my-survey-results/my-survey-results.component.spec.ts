import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySurveyResultsComponent } from './my-survey-results.component';

describe('MySurveyResultsComponent', () => {
  let component: MySurveyResultsComponent;
  let fixture: ComponentFixture<MySurveyResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MySurveyResultsComponent]
    });
    fixture = TestBed.createComponent(MySurveyResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
