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
import { PollEngagementResponse } from '../interfaces/pollResponses.interface';

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

  private pollResponseEngagement: PollEngagementResponse = {
    cognitive: 0,
    emotional: 0,
    behavioral: 0,
  };
  private PollEngagementResponseDataSubject =
    new BehaviorSubject<PollEngagementResponse>(this.pollResponseEngagement);
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
  public PollEngagementResponseData$ =
    this.PollEngagementResponseDataSubject.asObservable();
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
      .pipe
      /* tap((value) =>
          console.log(
            '(tap en data-real-time-service) Escuchando el evento dashboardActivity',
            value
          )
        )*/
      ()
      .subscribe((activity: any) => {
        this.activitySubject.next(activity);
      });

    this.socketService
      .on<RecordActivity>('activityCommentRealTime')
      .pipe
      /*tap((value) =>
          console.log(
            '(tap en data-real-time-service) Escuchando el evento activityCommentRealTime',
            value
          )
        )*/
      ()
      .subscribe((activity: RecordActivity) => {
        this.activityCommentSubject.next(activity);
      });

    this.socketService
      .on<Emotion>('dashboardEmotions')
      .pipe
      /*tap((value) =>
          console.log(
            '(tap en data-real-time-service) Escuchando el evento dashboardEmotions',
            value
          )
        )*/
      ()
      .subscribe((activity: Emotion) => {
        this.emotionsDataSubject.next(activity);
      });

    this.socketService
      .on<PollEngagementResponse>('dashboardPollsEngagement')
      .pipe(
        tap((value) =>
          console.log(
            '(tap en data-real-time-service) Escuchando el evento dashboardPollsEngagement',
            value
          )
        )
      )
      .subscribe((activity: PollEngagementResponse) => {
        this.PollEngagementResponseDataSubject.next(activity);
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

  getPollEngagementResponseObservable$(): Observable<PollEngagementResponse> {
    return this.PollEngagementResponseData$;
  }

  getDashboardActivities(): Observable<DashboardActivity[]> {
    // console.log(
    //   'estoy en getDashboard valor de lenght de room Id',
    //   this.roomService.getRoomId().length
    // );
    if (this.roomService.getRoomId().length > 0) {
      //console.log('roomID getActivities', this.roomService.getRoomId());
      return this.http.get<DashboardActivity[]>(
        `${this.apiUrl}/dashboard-activities/${this.roomService.getRoomId()}`
      );
    } else {
      return of([]);
    }
  }

  getDashboardEmotions(): Observable<Emotion> {
    if (this.roomService.getRoomId().length > 0) {
      //console.log('roomID', this.roomService.getRoomId());
      return this.http.get<Emotion>(
        `${this.apiUrl}/dashboard-emotions/${this.roomService.getRoomId()}`
      );
    } else {
      return of(this.emotion);
    }
  }

  getDashboardPollEngagementResponse(): Observable<PollEngagementResponse> {
    if (this.roomService.getRoomId().length > 0) {
      console.log('Estoy PollresponseEngagement', this.roomService.getRoomId());
      return this.http.get<PollEngagementResponse>(
        `${
          this.apiUrl
        }/dashboard-poll-responses/${this.roomService.getRoomId()}`
      );
    } else {
      return of(this.pollResponseEngagement);
    }
  }

  getCommentsAndDoubts(): Observable<RecordActivity[]> {
    // console.log(
    //   'roomID getRecoractivitiesActivities',
    //   this.roomService.getRoomId()
    // );
    if (this.roomService.getRoomId().length > 0) {
      return this.http.get<RecordActivity[]>(
        `${
          this.apiUrl
        }/recordActivities/${this.roomService.getRoomId()}/comment`
      );
    } else {
      return of([]);
    }
  }

  // get to dashboard-activities/clearIntervals
  clearIntervals(): Observable<{ message: string }> {
    return this.http.get<any>(
      `${this.apiUrl}/dashboard-activities/clearIntervals`
    );
  }
}
