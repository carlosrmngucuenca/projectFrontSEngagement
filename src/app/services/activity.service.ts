import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { Activity } from '../interfaces/activity,interface';
import { ACTIVITY } from '../modules/student/enums/activity.enum';
import { RoomService } from './room.service';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(
    private socketService: SocketService,
    private roomService: RoomService
  ) {}

  saveActivity(roomId: string, activity: ACTIVITY) {
    console.log(this.roomService.getUserId());
    this.socketService.emit<Activity>('saveActivity', {
      roomId,
      activityType: activity,
      userId: this.roomService.getUserId(),
    });
  }

  saveComment(roomId: string, activityType: ACTIVITY, text: string) {
    console.log(this.roomService.getUserId());
    this.socketService.emit('saveActivityComment', {
      roomId,
      activityType: activityType,
      text,
      userId: this.roomService.getUserId(),
    });
    //console.log('saveComment');
  }
}
