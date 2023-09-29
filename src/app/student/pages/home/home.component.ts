import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { socketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  constructor(private socketService: socketService,) {}
  ngOnInit(): void {

  }
  buttonActivitySleep() {
    //this.socketService.emitEvent('saveActivitySleep', this.data);
  }
  buttonActivityIdontGetIt() {
    //this.socketService.emitEvent('saveActivityIdontGetIt', this.data);
  }
  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
