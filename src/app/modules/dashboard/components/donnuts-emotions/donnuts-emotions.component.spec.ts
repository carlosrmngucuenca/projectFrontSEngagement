import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonnutsEmotionsComponent } from './donnuts-emotions.component';

describe('DonnutsEmotionsComponent', () => {
  let component: DonnutsEmotionsComponent;
  let fixture: ComponentFixture<DonnutsEmotionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonnutsEmotionsComponent]
    });
    fixture = TestBed.createComponent(DonnutsEmotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
