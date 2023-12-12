import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  private progressBarSubject = new BehaviorSubject<number>(0);
  progress$: Observable<number> = this.progressBarSubject.asObservable();
  private localStorageProgressBarValue = 'ProgressBarValue';
  constructor() {
    this.loadFromLocalStorage();
  }

  setProgress(value: number) {
    this.progressBarSubject.next(value);
    localStorage.setItem(this.localStorageProgressBarValue, value.toString());
  }

  getProgress$(): number {
    return this.progressBarSubject.getValue();
  }

  resetProgressBar() {
    this.progressBarSubject.next(0);
  }

  private loadFromLocalStorage() {
    const savedProgressBarValue = localStorage.getItem(
      this.localStorageProgressBarValue
    );
    if (savedProgressBarValue !== null) {
      const value = parseInt(savedProgressBarValue, 10);
      this.progressBarSubject.next(value);
    }
  }
}
