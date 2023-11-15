import { RoomService } from './../../../../services/room.service';
import { Component, OnInit } from '@angular/core';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  roomCode = this.roomService.getRoomCode() || 'MRA123'; //Cabmiar a el codigo de la sala
  constructor(
    private roomService: RoomService,
    private dataRealTimeService: DataRealTimeService,
    ) { }
  ngOnInit(): void {
    if (this.roomCode) {
      this.roomService.joinRoom(this.roomCode);
    }
  }
}
