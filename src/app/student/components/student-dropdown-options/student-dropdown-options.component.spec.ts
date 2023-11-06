import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDropdownOptionsComponent } from './student-dropdown-options.component';

describe('StudentDropdownOptionsComponent', () => {
  let component: StudentDropdownOptionsComponent;
  let fixture: ComponentFixture<StudentDropdownOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentDropdownOptionsComponent]
    });
    fixture = TestBed.createComponent(StudentDropdownOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
