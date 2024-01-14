import { Injectable, OnInit } from '@angular/core';
import { SocketService } from './socket.service';
import { BehaviorSubject, Observable, Subject, of, tap } from 'rxjs';
import {
  Activity,
  CreateActivityCommentDTO,
  DashboardActivity,
  RecordActivity,
} from '../interfaces/activity,interface';
import { Emotion } from '../interfaces/emotion.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RoomService } from './room.service';

@Injectable({
  providedIn: 'root',
})
export class DataRealTimeService implements OnInit {
  private activity: Activity = {
    roomId: '',
    activityType: '',
    userId: '',
  };
  private Dashboardactivity: DashboardActivity = {
    activityType: '',
    count: 0,
    roomId: '',
    createAt: new Date(),
    updatedAt: new Date(),
    historial: [],
  };
  private Recordactivity: RecordActivity = {
    _id: '',
    activityType: '',
    userId: '',
    roomId: '',
    text: '',
    date: new Date(),
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
  private activitySubject = new BehaviorSubject<DashboardActivity>(
    this.Dashboardactivity
  );
  private activityCommentSubject = new BehaviorSubject<RecordActivity>(
    this.Recordactivity
  );
  public activity$ = this.activitySubject.asObservable();
  public activityComment$ = this.activityCommentSubject.asObservable();
  public emotionsData$ = this.emotionsDataSubject.asObservable();
  private apiUrl = environment.baseUrl;
  private storageKey = 'roomId';
  private roomId = '';
  constructor(
    private socketService: SocketService,
    private http: HttpClient,
    private roomService: RoomService
  ) {
    this.socketService
      .on<any>('dashboardActivity')
      .pipe(
        tap((value) =>
          console.log(
            'dashboardActivity real time from DataRealTimeService tap operator',
            this.roomService.getRoomId()
          )
        )
      )
      .subscribe((activity: any) => {
        this.activitySubject.next(activity);
      });

    this.socketService
      .on<RecordActivity>('activityCommentRealTime')
      .pipe(
        tap((value) =>
          console.log(
            'activityCommentRealTime real time from DataRealTimeCommentService tap operator',
            value
          )
        )
      )
      .subscribe((activity: RecordActivity) => {
        this.activityCommentSubject.next(activity);
      });

    this.socketService
      .on<Emotion>('dashboardEmotions')
      .pipe(
        tap((value) =>
          console.log(
            'dashboardEmotions real time from DataRealTimeService dashboardEmotions',
            value
          )
        )
      )
      .subscribe((activity: Emotion) => {
        this.emotionsDataSubject.next(activity);
      });
  }

  ngOnInit() {}

  getActivity$(): Observable<DashboardActivity> {
    return this.activity$;
  }
  getActivityComment$(): Observable<RecordActivity> {
    return this.activityComment$;
  }

  getEmotionsDataObservable$(): Observable<Emotion> {
    return this.emotionsData$;
  }

  getDashboardActivities(): Observable<DashboardActivity[]> {
    console.log('roomID getActivities', this.roomService.getRoomId());
    return this.http.get<DashboardActivity[]>(
      `${this.apiUrl}/dashboard-activities/${this.roomService.getRoomId()}`
    );
  }

  getDashboardEmotions(): Observable<Emotion> {
    console.log('roomID', this.roomService.getRoomId());
    return this.http.get<Emotion>(
      `${this.apiUrl}/dashboard-emotions/${this.roomService.getRoomId()}`
    );
  }

  getCommentsAndDoubts(): Observable<RecordActivity[]> {
    console.log(
      'roomID getRecoractivitiesActivities',
      this.roomService.getRoomId()
    );
    if (this.roomService.getRoomId()) {
      return this.http.get<RecordActivity[]>(
        `${
          this.apiUrl
        }/recordActivities/${this.roomService.getRoomId()}/comment`
      );
    } else {
      return of([]);
    }
  }
}
