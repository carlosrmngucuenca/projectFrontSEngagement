import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { Activity } from '../interfaces/activity,interface';

@Injectable({
  providedIn: 'root'
})
export class DataRealTimeService {

  constructor(
    private socketService: SocketService
  ){
    this.socketService.on<Activity>('activityRealTime').subscribe((data) => {
      console.log(data);

    });
  }
  testFunction(){
    console.log('testFunction');
  }



}
