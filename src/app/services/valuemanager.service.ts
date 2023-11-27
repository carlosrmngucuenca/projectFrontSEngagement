import { Injectable } from '@angular/core';
import { ClickCounterService } from './click-counter.service';
import { ProgressBarService } from './progress-bar.service';

@Injectable({
  providedIn: 'root',
})
export class ValuemanagerService {
  constructor(
    private clickCounterService: ClickCounterService,
    private progressBarService: ProgressBarService
  ) {}

  resetValues() {
    this.clickCounterService.resetCountClicks();
    this.progressBarService.resetProgressBar();
  }
}
