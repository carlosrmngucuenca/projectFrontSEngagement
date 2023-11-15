import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  private progressBarSubject = new BehaviorSubject<number>(0);
  progress$: Observable<number> = this.progressBarSubject.asObservable();
  constructor() {}

  setProgress(value: number) {
    this.progressBarSubject.next(value);
  }

  getProgress$(): number {
    return this.progressBarSubject.getValue();
  }
}
