// screen.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  private wakeLock: WakeLockSentinel | null = null;

  enableKeepAwake() {
    if ('wakeLock' in navigator) {
      navigator.wakeLock.request('screen').then((wakeLock) => {
        this.wakeLock = wakeLock;
      }).catch(console.error);
    }
  }

  disableKeepAwake() {
    if (this.wakeLock !== null) {
      this.wakeLock.release(); // Release the WakeLock
      this.wakeLock = null;
    }
  }

  // Add this method to keep the screen on indefinitely
  keepScreenOn() {
    if ('wakeLock' in navigator) {
      navigator.wakeLock.request('screen').then((wakeLock) => {
        this.wakeLock = wakeLock;
        this.wakeLock.addEventListener('release', () => {
          this.keepScreenOn(); // Re-acquire the WakeLock when it's released
        });
      }).catch(console.error);
    }
  }
}
