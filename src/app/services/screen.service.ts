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
      this.wakeLock.release(); // Liberar el WakeLock
      this.wakeLock = null;
    }
  }
}
