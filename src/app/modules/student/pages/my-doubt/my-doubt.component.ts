import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ACTIVITY } from '../../enums/activity.enum';
import { ActivityService } from 'src/app/services/activity.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-my-doubt',
  templateUrl: './my-doubt.component.html',
  styleUrls: ['./my-doubt.component.css'],
})
export class MyDoubtComponent {
  ACTIVITY = ACTIVITY;
  roomId = this.roomService.getRoomId();
  constructor(
    private router: Router,
    private serviceActivity: ActivityService,
    private roomService: RoomService
  ) {}

  @ViewChild('textAreaDoubts') textAreaComment!: ElementRef;
  submitQuestion(activity: ACTIVITY) {
    //get text from textarea
    const text = this.textAreaComment.nativeElement.value.trim();
    if (text && this.roomId) {
      console.log('submit comment', text);
      //redirect to path /student/home
      this.serviceActivity.saveComment(
        this.roomId,
        this.ACTIVITY.comment,
        text
      );
      this.router.navigate(['/student/home']);
    } else {
      console.log('text area is empty or contains only blank spaces');
    }
  }
}
