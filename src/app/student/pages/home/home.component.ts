import { Component } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  data = {
    // userId: '650f24f5b262e8e5612dab57',
    idRoom: '651391c0bd27fd024d5ae9a1',
    idPoll: '650f24f5b262e8e5612dab79',
  };
  constructor(private socketService: WebsocketService) {}
  buttonActivitySleep() {
    this.socketService.emitEvent('saveActivitySleep', this.data);
  }
  buttonActivityIdontGetIt() {
    this.socketService.emitEvent('saveActivityIdontGetIt', this.data);
  }
}
