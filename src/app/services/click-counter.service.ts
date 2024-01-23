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
  private localStorageKeyLove = 'loveClassClicks';
  private localStorageKeyTakeBreak = 'takeBreakClassClicks';
  private localStorageKeySleep = 'sleepClassClicks';
  private localStorageKeyEmotion = 'emotionClassClicks';
  private localStorageKeyComments = 'commentsClassClicks';
  private localStorageKeyDoubts = 'doubtsClassClicks';
  private localStorageKeyDonotGetIt = 'donotGetItClassClicks';
  constructor() {
    this.loadFromLocalStorage();
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
      localStorage.setItem(this.localStorageKeyLove, newCount.toString());
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
      localStorage.setItem(this.localStorageKeyTakeBreak, newCount.toString());
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
      localStorage.setItem(this.localStorageKeySleep, newCount.toString());
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
      localStorage.setItem(this.localStorageKeyDonotGetIt, newCount.toString());
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
      localStorage.setItem(this.localStorageKeyComments, newCount.toString());
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
      localStorage.setItem(this.localStorageKeyEmotion, newCount.toString());
    }
  }

  getEmotionsClicks(): number {
    //console.log('get emotions clicks', this.emotionsSubject.value);
    return this.emotionsSubject.value;
  }

  incrementDoubtsClicks() {
    const currentCount = this.sendDoubtsSubject.value;
    if (currentCount < 4) {
      const newCount = currentCount + 1;
      this.sendDoubtsSubject.next(newCount);
      localStorage.setItem(this.localStorageKeyDoubts, newCount.toString());
    }
  }

  getDoubtsClicks(): number {
    return this.sendDoubtsSubject.value;
  }

  resetCountClicks() {
    this.sendCommentsSubject.next(0);
    this.donotGetItkSubject.next(0);
    this.emotionsSubject.next(0);
    this.sendDoubtsSubject.next(0);
    this.loveClassClicksSubject.next(0);
    this.sleepSubject.next(0);
    this.takeBreakSubject.next(0);
  }

  private loadFromLocalStorage() {
    const savedLoveClickCount = localStorage.getItem(this.localStorageKeyLove);
    const savedTakeBreakClickCount = localStorage.getItem(
      this.localStorageKeyTakeBreak
    );
    const savedSleepClickCount = localStorage.getItem(
      this.localStorageKeySleep
    );
    const savedDonotGgetItClickCount = localStorage.getItem(
      this.localStorageKeyDonotGetIt
    );
    const savedEmotionClickCount = localStorage.getItem(
      this.localStorageKeyEmotion
    );
    const savedCommentClickCount = localStorage.getItem(
      this.localStorageKeyComments
    );
    const savedDoubtClickCount = localStorage.getItem(
      this.localStorageKeyDoubts
    );
    if (savedLoveClickCount !== null) {
      const count = parseInt(savedLoveClickCount, 10);
      this.loveClassClicksSubject.next(count);
    }
    if (savedTakeBreakClickCount !== null) {
      const count = parseInt(savedTakeBreakClickCount, 10);
      this.takeBreakSubject.next(count);
    }
    if (savedSleepClickCount !== null) {
      const count = parseInt(savedSleepClickCount, 10);
      this.sleepSubject.next(count);
    }
    if (savedDonotGgetItClickCount !== null) {
      const count = parseInt(savedDonotGgetItClickCount, 10);
      this.donotGetItkSubject.next(count);
    }
    if (savedEmotionClickCount !== null) {
      const count = parseInt(savedEmotionClickCount, 10);
      this.emotionsSubject.next(count);
    }
    if (savedCommentClickCount !== null) {
      const count = parseInt(savedCommentClickCount, 10);
      this.sendCommentsSubject.next(count);
    }
    if (savedDoubtClickCount !== null) {
      const count = parseInt(savedDoubtClickCount, 10);
      this.sendDoubtsSubject.next(count);
    }
  }
}
