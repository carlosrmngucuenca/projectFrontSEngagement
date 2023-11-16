import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { Activity } from '../interfaces/activity,interface';
import { RoomService } from './room.service';

@Injectable({
  providedIn: 'root'
})
export class DataRealTimeService {
  constructor(
    private socketService: SocketService,
  ){
    this.socketService.on<Activity>('activityRealTime').subscribe((activity: Activity) => {
      console.log(activity);
    } );
  }



}
