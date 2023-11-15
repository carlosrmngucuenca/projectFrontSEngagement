import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClickCounterService {
  private loveClassClicksSubject = new BehaviorSubject<number>(0);
  private sendCommentsSubject = new BehaviorSubject<number>(0);
  private sleepSubject = new BehaviorSubject<number>(0);
  private takeBreakSubject = new BehaviorSubject<number>(0);
  private donotGetItkSubject = new BehaviorSubject<number>(0);
  private emotionsSubject = new BehaviorSubject<number>(0);
  private sendDoubtsSubject = new BehaviorSubject<number>(0);
  loveClass$: Observable<number> = this.loveClassClicksSubject.asObservable();
  sendComments$: Observable<number> = this.sendCommentsSubject.asObservable();
  sleep$: Observable<number> = this.sleepSubject.asObservable();
  takeBreak$: Observable<number> = this.takeBreakSubject.asObservable();
  donotGetIt$: Observable<number> = this.donotGetItkSubject.asObservable();
  emotion$: Observable<number> = this.emotionsSubject.asObservable();
  sendDoubt$: Observable<number> = this.sendCommentsSubject.asObservable();
  constructor() {
    this.loveClassClicksSubject.getValue();
    this.takeBreakSubject.getValue();
    this.sleepSubject.getValue();
    this.takeBreakSubject.getValue();
    this.emotionsSubject.getValue();
    this.sendCommentsSubject.getValue();
    this.sendDoubtsSubject.getValue();
  }

  sendValueForLoveClass(value: number) {
    this.loveClassClicksSubject.next(value);
  }

  sendValueForSleep(value: number) {
    this.sleepSubject.next(value);
  }

  sendValueForTakeBreak(value: number) {
    this.takeBreakSubject.next(value);
  }

  sendValueForDonotGetITComment(value: number) {
    this.donotGetItkSubject.next(value);
  }

  incrementLoveClassClicks() {
    const currentCount = this.loveClassClicksSubject.value;
    if (currentCount < 4) {
      const newCount = currentCount + 1;
      this.loveClassClicksSubject.next(newCount);
    }
  }

  getLoveClassClicks(): number {
    return this.loveClassClicksSubject.value;
  }

  incrementTakeBreakClicks() {
    const currentCount = this.takeBreakSubject.value;
    if (currentCount < 4) {
      const newCount = currentCount + 1;
      this.takeBreakSubject.next(newCount);
    }
  }

  getTakeBreakClicks(): number {
    return this.takeBreakSubject.value;
  }

  incrementSleepClicks() {
    const currentCount = this.sleepSubject.value;
    if (currentCount < 4) {
      const newCount = currentCount + 1;
      this.sleepSubject.next(newCount);
    }
  }

  getTakeSleepClicks(): number {
    return this.sleepSubject.value;
  }

  incrementDonotGetItClicks() {
    const currentCount = this.donotGetItkSubject.value;
    if (currentCount < 4) {
      const newCount = currentCount + 1;
      this.donotGetItkSubject.next(newCount);
    }
  }

  getdonotGetItClicks(): number {
    return this.donotGetItkSubject.value;
  }

  incrementSendCommentsClicks() {
    const currentCount = this.sendCommentsSubject.value;
    if (currentCount < 4) {
      const newCount = currentCount + 1;
      this.sendCommentsSubject.next(newCount);
    }
  }

  getSendCommentClicks(): number {
    return this.sendCommentsSubject.value;
  }

  incrementEmotionsClicks() {
    const currentCount = this.emotionsSubject.value;
    if (currentCount < 4) {
      const newCount = currentCount + 1;
      this.emotionsSubject.next(newCount);
    }
  }

  getEmotionsClicks(): number {
    console.log('get emotions clicks', this.emotionsSubject.value);
    return this.emotionsSubject.value;
  }

  incrementDoubtsClicks() {
    const currentCount = this.sendDoubtsSubject.value;
    if (currentCount < 4) {
      const newCount = currentCount + 1;
      this.sendDoubtsSubject.next(newCount);
    }
  }

  getDoubtsClicks(): number {
    return this.sendDoubtsSubject.value;
  }
}
