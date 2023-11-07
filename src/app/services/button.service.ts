import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ButtonService {
  private loveClassSubject = new BehaviorSubject<number>(0);
  private sendCommentsSubject = new BehaviorSubject<number>(0);
  private sleepSubject = new BehaviorSubject<number>(0);
  private takeBreakSubject = new BehaviorSubject<number>(0);
  private donotGetItkSubject = new BehaviorSubject<number>(0);

  loveClass$: Observable<number> = this.loveClassSubject.asObservable();

  sendComments$: Observable<number> = this.sendCommentsSubject.asObservable();

  sleep$: Observable<number> = this.sleepSubject.asObservable();

  takeBreak$: Observable<number> = this.takeBreakSubject.asObservable();
  donotGetIt$: Observable<number> = this.donotGetItkSubject.asObservable();

  sendValueForLoveClass(value: number) {
    this.loveClassSubject.next(value);
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
}
