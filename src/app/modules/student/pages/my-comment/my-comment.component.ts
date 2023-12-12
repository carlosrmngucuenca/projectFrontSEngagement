import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ACTIVITY } from '../../enums/activity.enum';
import { ActivityService } from 'src/app/services/activity.service';
import { RoomService } from 'src/app/services/room.service';
import { SumService } from 'src/app/services/sum.service';

@Component({
  selector: 'app-my-comment',
  templateUrl: './my-comment.component.html',
  styleUrls: ['./my-comment.component.css'],
})
export class MyCommentComponent {
  roomId = this.roomService.getRoomId();
  @ViewChild('textAreaComment') textAreaComment!: ElementRef;
  ACTIVITY = ACTIVITY;
  text: string = '';
  constructor(
    private router: Router,
    private serviceActivity: ActivityService,
    private roomService: RoomService,
    private sumService: SumService
  ) {}

  submitComment(activity: ACTIVITY) {
    //get text from textarea
    this.text = this.textAreaComment.nativeElement.value.trim();
    if (this.text && this.roomId) {
      console.log('submit comment', this.text);
      this.serviceActivity.saveComment(
        this.roomId,
        this.ACTIVITY.comment,
        this.text
      );
      this.sumService.addValuePointsSendComments();
      this.router.navigate(['/student/home']);
      //redirect to path /student/home
    } else {
      console.log('text area is empty or contains only blank spaces');
    }
  }
}
