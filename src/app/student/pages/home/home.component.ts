import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JoinRoom } from 'src/app/interfaces/room/room.interface';
import { SocketService } from 'src/app/services/socket.service';


import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  roomCode = this.roomService.getRoomCode();//get data from URL

  constructor(
    private socketService: SocketService,
    private roomService: RoomService
  ) { }

  ngOnInit(): void {
    console.log(this.roomCode);
    if (this.roomCode) {
      this.socketService.emit<JoinRoom>('joinRoom', { roomCode: this.roomCode });
    }

    this.socketService.onSuccess().subscribe((success) => {
      console.log(success);

    });
    this.socketService.onError().subscribe((error) => {
      console.log(error);
    });
  }
  buttonActivitySleep() {
    this.socketService.emit('saveActivitySleep', { roomCode: this.roomCode });
  }
  buttonActivityIdontGetIt() {
    this.socketService.emit('saveActivityIdontGetIt', { roomCode: this.roomCode });
  }
  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
