import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity,interface';
import { JoinRoom } from 'src/app/interfaces/room.interface';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';
import { PollService } from 'src/app/services/poll.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  sidebarWidth = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private pollService: PollService,
    private sideBarService: SidebarService,
    private router: Router
  ) {
    this.sideBarService.getwidthObservable$().subscribe((data: boolean) => {
      this.sidebarWidth = data;
    });
  }

  sendPoll() {
    //this.pollService.sendPoll();
    console.log('send poll');
  }
  closePoll() {
    // this.pollService.closePoll();
    console.log('close poll');
  }

  navigateToPollPage() {
    this.router.navigateByUrl('/dashboard/my-polls');
  }
}
