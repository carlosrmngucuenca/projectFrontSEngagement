import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { socketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  roomCode= "MRA123";
  data={roomCode:this.roomCode};
  constructor(private socketService: socketService,) {}
  ngOnInit(): void {
    this.socketService.onSuccess()
      .subscribe((data) => {
        console.log('success', data);
      });
  }
  buttonActivitySleep() {
    this.socketService.emit('saveActivitySleep', this.data);
  }
  buttonActivityIdontGetIt() {
    this.socketService.emit('saveActivityIdontGetIt', this.data);
  }
  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
