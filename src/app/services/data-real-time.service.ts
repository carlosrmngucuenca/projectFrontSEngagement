import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import {
  Activity,
  CreateActivityCommentDTO,
} from '../interfaces/activity,interface';
import { Emotion } from '../interfaces/emotion.interface';

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
  private emotion: Emotion = {
    _id: '',
    surprised: 0,
    afraid: 0,
    angry: 0,
    sad: 0,
    happy: 0,
  };
  private emotionsDataSubject = new BehaviorSubject<Emotion>(this.emotion);
  private activitySubject = new BehaviorSubject<Activity>(this.activity);
  private activityCommentSubject =
    new BehaviorSubject<CreateActivityCommentDTO>(this.activityComment);
  public activity$ = this.activitySubject.asObservable();
  public activityComment$ = this.activityCommentSubject.asObservable();
  public emotionsData$ = this.emotionsDataSubject.asObservable();
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

    this.socketService
      .on<Emotion>('dashboardEmotions')
      .pipe(
        tap((value) =>
          console.log(
            'real time from DataRealTimeService dashboardEmotions',
            value
          )
        )
      )
      .subscribe((activity: Emotion) => {
        this.emotionsDataSubject.next(activity);
      });
  }

  getActivity$(): Observable<Activity> {
    return this.activity$;
  }
  getActivityComment$(): Observable<CreateActivityCommentDTO> {
    return this.activityComment$;
  }

  getEmotionsDataObservable$(): Observable<Emotion> {
    return this.emotionsData$;
  }
}
