import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConfigroomComponent } from './my-configroom.component';

describe('MyConfigroomComponent', () => {
  let component: MyConfigroomComponent;
  let fixture: ComponentFixture<MyConfigroomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyConfigroomComponent]
    });
    fixture = TestBed.createComponent(MyConfigroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
