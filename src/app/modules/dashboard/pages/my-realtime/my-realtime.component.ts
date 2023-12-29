import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity,interface';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';
import { RoomService } from 'src/app/services/room.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { SocketService } from 'src/app/services/socket.service';
@Component({
  selector: 'app-my-realtime',
  templateUrl: './my-realtime.component.html',
  styleUrls: ['./my-realtime.component.css'],
})
export class MyRealtimeComponent {
  sidebarWidth = true;
  private subscription: Subscription = new Subscription();
  constructor(private sideBarService: SidebarService) {
    this.sideBarService.getwidthObservable$().subscribe((data: boolean) => {
      this.sidebarWidth = data;
    });
  }
  ngOnInit() {}
}
