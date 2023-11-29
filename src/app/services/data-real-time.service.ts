import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  Activity,
  CreateActivityCommentDTO,
} from '../interfaces/activity,interface';

@Injectable({
  providedIn: 'root',
})
export class DataRealTimeService {
  private activity: Activity = {
    roomId: '',
    activityType: '',
    userId: '',
  };
  private activityComment: CreateActivityCommentDTO = {
    roomId: '',
    activityType: '',
    text: '',
  };
  private activitySubject = new BehaviorSubject<Activity>(this.activity);
  public activity$ = this.activitySubject.asObservable();
  private activityCommentSubject =
    new BehaviorSubject<CreateActivityCommentDTO>(this.activityComment);
  public activityComment$ = this.activityCommentSubject.asObservable();
  constructor(private socketService: SocketService) {
    this.socketService
      .on<Activity>('activityRealTime')
      .pipe(
        tap((value) =>
          console.log('real time from DataRealTimeService tap operator', value)
        )
      )
      .subscribe((activity: Activity) => {
        this.activitySubject.next(activity);
      });

    this.socketService
      .on<CreateActivityCommentDTO>('activityCommentRealTime')
      .pipe(
        tap((value) =>
          console.log(
            'real time from DataRealTimeCommentService tap operator',
            value
          )
        )
      )
      .subscribe((activity: CreateActivityCommentDTO) => {
        this.activityCommentSubject.next(activity);
      });
  }

  getActivity$(): Observable<Activity> {
    return this.activity$;
  }
  getActivityComment$(): Observable<CreateActivityCommentDTO> {
    return this.activityComment$;
  }
}
