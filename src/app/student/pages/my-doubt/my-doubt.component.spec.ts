import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDoubtComponent } from './my-doubt.component';

describe('MyDoubtComponent', () => {
  let component: MyDoubtComponent;
  let fixture: ComponentFixture<MyDoubtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyDoubtComponent]
    });
    fixture = TestBed.createComponent(MyDoubtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
