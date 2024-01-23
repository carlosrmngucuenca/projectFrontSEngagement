import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity,interface';
import { JoinRoom } from 'src/app/interfaces/room.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';
import { PollService } from 'src/app/services/poll.service';
import { RoomService } from 'src/app/services/room.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  roomCode = this.roomService.getRoomCode(); //get data from URL
  sidebarWidth = true;
  private subscription: Subscription = new Subscription();
  pollID: string = 'PollID';
  constructor(
    private pollService: PollService,
    private sideBarService: SidebarService,
    private router: Router,
    private roomService: RoomService
  ) {
    this.sideBarService.getwidthObservable$().subscribe((data: boolean) => {
      this.sidebarWidth = data;
    });
  }
  ngOnInit(): void {
    if (this.roomCode) {
      this.roomService.joinRoom(this.roomCode);
    }
  }

  closePoll() {
    // this.pollService.closePoll();
    const savedPollId = localStorage.getItem(this.pollID);
    if (savedPollId !== null) {
      this.pollService.closePoll(this.pollID);
    }

    // console.log('close poll');
  }

  navigateToPollPage() {
    this.router.navigateByUrl('/dashboard/my-polls');
  }
}
