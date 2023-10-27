import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgressBarComponent } from './student-progress-bar.component';

describe('StudentProgressBarComponent', () => {
  let component: StudentProgressBarComponent;
  let fixture: ComponentFixture<StudentProgressBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentProgressBarComponent]
    });
    fixture = TestBed.createComponent(StudentProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
