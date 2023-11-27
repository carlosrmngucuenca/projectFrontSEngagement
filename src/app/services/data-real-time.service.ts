import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Activity, CreateActivitytDTO } from '../interfaces/activity,interface';

@Injectable({
  providedIn: 'root',
})
export class DataRealTimeService {
  private activity: Activity = { roomId: '', activityType: '' };
  private activityComment: CreateActivitytDTO = {
    roomId: '',
    activityType: '',
    text: '',
  };
  private activitySubject = new BehaviorSubject<Activity>(this.activity);
  public activity$ = this.activitySubject.asObservable();
  private activityCommentSubject = new BehaviorSubject<CreateActivitytDTO>(
    this.activityComment
  );
  public activityComment$ = this.activityCommentSubject.asObservable();
  constructor(private socketService: SocketService) {
    this.socketService
      .on('activityRealTime')
      .pipe(
        tap((value) =>
          console.log('real time from DataRealTimeService tap operator', value)
        )
      )
      .subscribe(console.log);
  }

  getActivity$(): Observable<Activity | CreateActivitytDTO> {
    return this.activity$;
  }
  getActivityComment$(): Observable<CreateActivitytDTO> {
    return this.activityComment$;
  }
}
