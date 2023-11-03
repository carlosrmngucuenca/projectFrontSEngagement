import { Component } from '@angular/core';
import { EMOTION } from '../../enums/emotions.enum';
import { ACTIVITY } from '../../enums/activity.enum';
import { RoomService } from 'src/app/services/room.service';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-my-emotions',
  templateUrl: './my-emotions.component.html',
  styleUrls: ['./my-emotions.component.css']
})
export class MyEmotionsComponent {
  EMOTION = EMOTION;
  ACTIVITY = ACTIVITY;
  emotion: EMOTION = EMOTION.HAPPY;
  roomId = this.roomService.getRoomId();

  constructor(
    private roomService: RoomService,
    private serviceActivity: ActivityService,
  ) { }

  onButtonClick(emotion: EMOTION) {
    this.emotion = emotion;
    if (this.roomId) {
      this.serviceActivity.saveComment(this.roomId, this.ACTIVITY.emotion, emotion);
    }
  }
}
