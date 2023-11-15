import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { Activity } from '../interfaces/activity,interface';
import { ACTIVITY } from '../modules/student/enums/activity.enum';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private socketService: SocketService,
  ) { }

  saveActivity(roomId: string, activity: ACTIVITY) {
    this.socketService.emit<Activity>('saveActivity', { roomId, activityType: activity });
  }

  saveComment(roomId: string, activityType: ACTIVITY, text: string) {
    this.socketService.emit('saveActivityComment', { roomId, activityType: activityType, text });
    console.log('saveComment');
  }
}
