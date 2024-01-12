import { Component } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { DataRealTimeService } from '../../../../services/data-real-time.service';

@Component({
  selector: 'dashboard-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(
  ) { }
  ngOnInit(): void {
  }
}
