import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPollComponent } from './my-poll.component';

describe('MyPollComponent', () => {
  let component: MyPollComponent;
  let fixture: ComponentFixture<MyPollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
