import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { JoinRoom } from 'src/app/interfaces/room/room.interface';
import { SocketService } from 'src/app/services/socket.service';
import { RoomService } from '../../../services/room.service';
import { ACTIVITY } from '../../enums/activity.enum';
import { Activity } from 'src/app/interfaces/activity,interface';
import { Poll } from 'src/app/interfaces/poll.interface';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {

  roomCode = this.roomService.getRoomCode();//get data from URL
  roomId = this.roomService.getIdRoom();
  ACTIVITY = ACTIVITY;//This is for bind enum in html
  isPollActived: boolean = false;

  constructor(
    private socketService: SocketService,
    private roomService: RoomService,
    private pollService: PollService,
  ) { }

  ngOnInit(): void {
    this.socketService.connect();
    this.pollService.isPollActive$().subscribe((isPollActive) => {
      if (isPollActive) {
        console.log('notificacion de poll activada');
      }
    });

    if (this.roomCode) {
      this.socketService.emit<JoinRoom>('joinRoom', { roomCode: this.roomCode });
    }

    this.socketService.onSuccess().subscribe((success) => {
      console.log(success);
    });
    this.socketService.onError().subscribe((error) => {
      console.error(error);
    });

  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  buttonSaveActivity(activity: ACTIVITY) {
    if (this.roomCode) {
      this.socketService.emit<Activity>('saveActivity', { roomId: this.roomId, activityType: activity });
    }
  }
}
