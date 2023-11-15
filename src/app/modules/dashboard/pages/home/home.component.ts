import { RoomService } from './../../../../services/room.service';
import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/interfaces/activity,interface';
import { JoinRoom } from 'src/app/interfaces/room.interface';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

}
