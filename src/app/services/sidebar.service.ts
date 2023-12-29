import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sideBarWidth = new Subject<boolean>();
  private sideBarWidth$ = this.sideBarWidth.asObservable();
  constructor() {}

  setSidebarWidth(width: boolean) {
    this.sideBarWidth.next(width);
  }

  getwidthObservable$(): Observable<boolean> {
    return this.sideBarWidth$;
  }
}
