import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigRoomFormComponent } from './config-room-form.component';

describe('ConfigRoomFormComponent', () => {
  let component: ConfigRoomFormComponent;
  let fixture: ComponentFixture<ConfigRoomFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigRoomFormComponent]
    });
    fixture = TestBed.createComponent(ConfigRoomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
