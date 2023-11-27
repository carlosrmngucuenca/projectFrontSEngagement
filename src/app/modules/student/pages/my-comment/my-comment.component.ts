import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ACTIVITY } from '../../enums/activity.enum';
import { ActivityService } from 'src/app/services/activity.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-my-comment',
  templateUrl: './my-comment.component.html',
  styleUrls: ['./my-comment.component.css'],
})
export class MyCommentComponent {
  roomId = this.roomService.getRoomId();
  @ViewChild('textAreaComment') textAreaComment!: ElementRef;
  ACTIVITY = ACTIVITY;
  constructor(
    private router: Router,
    private serviceActivity: ActivityService,
    private roomService: RoomService
  ) {}

  submitComment(activity: ACTIVITY) {
    //get text from textarea
    const text = this.textAreaComment.nativeElement.value.trim();
    if (text) {
      console.log('submit comment', text);
      //redirect to path /student/home
    } else {
      console.log('text area is empty or contains only blank spaces');
    }
    if (this.roomId) {
      this.serviceActivity.saveComment(
        this.roomId,
        this.ACTIVITY.comment,
        text
      );
      this.router.navigate(['/student/home']);
    }
  }
}
