import { Component, OnInit } from '@angular/core';
import { filter, tap } from 'rxjs';
import {
  Activity,
  CreateActivityCommentDTO,
  RecordActivity,
} from 'src/app/interfaces/activity,interface';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css'],
})
export class CommentCardComponent implements OnInit {
  comment: string = '';
  constructor(private dataRealTimeService: DataRealTimeService) {}
  comments: RecordActivity[] = [];
  ngOnInit() {
    this.dataRealTimeService
      .getActivityComment$()
      .pipe(
        //tap((res) => console.log('estoy comment card')),
        filter((activity: RecordActivity) => activity.activityType == 'comment')
      )
      .subscribe((activity) => {
        console.log(activity.text);
        this.fetchRealTimeData(activity);
      });

    this.loadPreviousValues();
  }

  fetchRealTimeData(activity: RecordActivity) {
    //console.log('hola soy commn card fetch', activity);
    this.comments.push(activity);
  }

  loadPreviousValues() {
    this.dataRealTimeService
      .getCommentsAndDoubts()
      .pipe(
        /*tap((res) => console.log('tap in comment card comppnent', res))*/)
      .subscribe((data: RecordActivity[]) => {
        if (data != null) {
          this.loadCcomments(data);
        } else {
          //console.log('No "load previous values" activity found.');
        }
      });
  }

  loadCcomments(previousData: RecordActivity[]) {
    this.comments = previousData;
  }
}
