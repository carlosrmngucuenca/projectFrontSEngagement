import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/interfaces/activity,interface';
import { JoinRoom } from 'src/app/interfaces/room.interface';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';
import { PollService } from 'src/app/services/poll.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  constructor( private pollService: PollService) {

   }

  sendPoll(){
    this.pollService.sendPoll();
    console.log("send poll");
  }
  closePoll(){
    this.pollService.closePoll();
    console.log("close poll");
  }



}
