import { Injectable } from '@angular/core';
import { ClickCounterService } from './click-counter.service';
import { ProgressBarService } from './progress-bar.service';

@Injectable({
  providedIn: 'root',
})
export class SumService {
  doNotGetItPercentaje: number = 5;
  takeBreakPercentaje: number = 5;
  sleepPercentaje: number = 5;
  loveClassPercentaje: number = 5;
  emotionPercentaje: number = 5;
  sendCommentsPercentaje: number = 15;
  doubtPercentaje: number = 15;
  constructor(
    private counterService: ClickCounterService,
    private progressService: ProgressBarService
  ) {}

  addValuePointsDoNotGetIt() {
    this.counterService.incrementDonotGetItClicks();
    if (this.counterService.getdonotGetItClicks() <= 2) {
      this.progressService.setProgress(
        this.progressService.getProgress$() + this.doNotGetItPercentaje
      );
    } else {
      console.log('no es posible mas click I DoNotGetIt Button');
    }
  }

  addValuePointsTakeBreak() {
    this.counterService.incrementTakeBreakClicks();
    if (this.counterService.getTakeBreakClicks() <= 2) {
      this.progressService.setProgress(
        this.progressService.getProgress$() + this.takeBreakPercentaje
      );
    } else {
      console.log('no es posible mas click I Take A break Button');
    }
  }

  addValuePointsSleep() {
    this.counterService.incrementSleepClicks();
    if (this.counterService.getTakeSleepClicks() <= 2) {
      this.progressService.setProgress(
        this.progressService.getProgress$() + this.sleepPercentaje
      );
    } else {
      console.log('no es posible mas click sleep Button');
    }
  }

  addValuePointsLoveClass() {
    this.counterService.incrementLoveClassClicks();
    if (this.counterService.getLoveClassClicks() <= 3) {
      this.progressService.setProgress(
        this.progressService.getProgress$() + this.loveClassPercentaje
      );
    } else {
      console.log('no es posible mas click love Button');
    }
  }

  addValuePointsEmotions() {
    this.counterService.incrementEmotionsClicks();
    if (this.counterService.getEmotionsClicks() <= 3) {
      this.progressService.setProgress(
        this.progressService.getProgress$() + this.emotionPercentaje
      );
    } else {
      console.log('no es posible mas click emotion Button');
    }
  }

  addValuePointsSendComments() {
    this.counterService.incrementSendCommentsClicks();
    if (this.counterService.getSendCommentClicks() <= 1) {
      this.progressService.setProgress(
        this.progressService.getProgress$() + this.sendCommentsPercentaje
      );
    } else {
      console.log('no es posible mas click comment Button');
    }
  }

  addValuePointsDoubts() {
    this.counterService.incrementDoubtsClicks();
    if (this.counterService.getDoubtsClicks() <= 1) {
      this.progressService.setProgress(
        this.progressService.getProgress$() + this.doubtPercentaje
      );
    } else {
      console.log('no es posible mas click doubt Button');
    }
  }
}
