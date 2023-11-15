import { Component } from '@angular/core';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';
@Component({
  selector: 'app-my-realtime',
  templateUrl: './my-realtime.component.html',
  styleUrls: ['./my-realtime.component.css']
})
export class MyRealtimeComponent {


  constructor(
    private dataRealTimeService: DataRealTimeService,
    ) { }

  ngOnInit() {


  }


}
