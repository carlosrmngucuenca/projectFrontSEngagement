import { Component } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { DataRealTimeService } from '../../../../services/data-real-time.service';

@Component({
  selector: 'dashboard-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  roomCode = 'MRA123'; //Cabmiar a el codigo de la sala
  constructor(
    private roomService: RoomService,
    private dataRealTimeService: DataRealTimeService

  ) { }
  ngOnInit(): void {
    this.roomService.checkRoomExists(this.roomCode, 'admin').subscribe((roomExists) => {
      if (roomExists.ok) {
       console.log('room exists, token admin save');
      }
    });//obtener un token para el administrado
    if (this.roomCode) {
      this.roomService.joinRoom(this.roomCode);
    }
  }
}
