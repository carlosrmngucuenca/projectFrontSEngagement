import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { RoomService } from '../../../../services/room.service';
import { ACTIVITY } from '../../enums/activity.enum';
import { PollService } from 'src/app/services/poll.service';
import { ActivityService } from 'src/app/services/activity.service';
import { Observable, of } from 'rxjs';
import { ButtonService } from 'src/app/services/button.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';


const observable = of(1);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  roomCode = this.roomService.getRoomCode(); //get data from URL
  roomId = this.roomService.getRoomId();
  ACTIVITY = ACTIVITY; //This is for bind enum in html
  isPollActived: boolean = false;

  constructor(
    private roomService: RoomService,
    private pollService: PollService,
    private activityService: ActivityService,
    private buttonService: ButtonService,
    private progressService: ProgressBarService,
  ) {
    this.pollService.isPollActive$().subscribe((isPollActive) => {
      if (isPollActive) {
        console.log('notificacion de poll activada');
      }
    });
  }

  ngOnInit(): void {
    if (this.roomCode) {
      this.roomService.joinRoom(this.roomCode);
    }
  }

  buttonSaveActivity(activity: ACTIVITY) {
    if (this.roomCode) {
      if (this.roomId) {
        this.activityService.saveActivity(this.roomId, activity);
      }
    }
  }

  handlerButtonLoveClass() {
    this.buttonSaveActivity(ACTIVITY.iloveit);
    this.buttonService.sendValueForLoveClass(3);
    this.progressService.setProgress(this.progressService.getProgress$() + 3);
  }
  handlerButtonSleep() {
    this.buttonSaveActivity(ACTIVITY.sleep);
    this.buttonService.sendValueForSleep(2);
    this.progressService.setProgress(this.progressService.getProgress$() + 2);
  }

  handlerButtonTakeBreak() {
    this.buttonSaveActivity(ACTIVITY.break);
    this.buttonService.sendValueForTakeBreak(1);
    this.progressService.setProgress(this.progressService.getProgress$() + 1);
  }

  handlerButtonDonotGetIt() {
    this.buttonSaveActivity(ACTIVITY.iDontGetIt);
    this.buttonService.sendValueForDonotGetITComment(1);
    this.progressService.setProgress(this.progressService.getProgress$() + 1);
  }
}
