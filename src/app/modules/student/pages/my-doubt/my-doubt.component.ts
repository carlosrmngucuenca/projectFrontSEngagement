import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ACTIVITY } from '../../enums/activity.enum';
import { ActivityService } from 'src/app/services/activity.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-my-doubt',
  templateUrl: './my-doubt.component.html',
  styleUrls: ['./my-doubt.component.css']
})
export class MyDoubtComponent {
  ACTIVITY = ACTIVITY;
  constructor(private router: Router,
    private serviceActivity: ActivityService,
    private roomService: RoomService,
  ) { }


  @ViewChild('textAreaComment') textAreaComment!: ElementRef;
  submitQuestion(activity: ACTIVITY,) {
    //get text from textarea
    const text = this.textAreaComment.nativeElement.value.trim();
    if (text) {
      console.log('submit comment', text);
      //redirect to path /student/home
      this.router.navigate(['/student/home']);
    } else {
      console.log('text area is empty or contains only blank spaces');
    }
    const roomId=this.roomService.getRoomId()
    if(roomId){
      this.serviceActivity.saveComment(roomId, this.ACTIVITY.comment, text);
    }



  }
}
