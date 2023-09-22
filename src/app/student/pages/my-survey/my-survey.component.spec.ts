import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySurveyComponent } from './my-survey.component';

describe('MySurveyComponent', () => {
  let component: MySurveyComponent;
  let fixture: ComponentFixture<MySurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySurveyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
