import { Component } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-my-realtime',
  templateUrl: './my-realtime.component.html',
  styleUrls: ['./my-realtime.component.css']
})
export class MyRealtimeComponent {


  constructor(private socketService: SocketService) { }

  ngOnInit() {

  }


}
