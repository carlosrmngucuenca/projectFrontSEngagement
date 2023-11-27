import { Component, OnInit } from '@angular/core';
import { filter, tap } from 'rxjs';
import {
  Activity,
  CreateActivitytDTO,
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
  ngOnInit() {
    this.dataRealTimeService
      .getActivityComment$()
      .pipe(
        tap((res) => console.log('estoy comment card')),
        filter((activity) => activity.activityType == 'comment')
      )
      .subscribe((activity) => {
        console.log(activity.text);
        this.fetchRealTimeData(activity.text);
      });
  }

  fetchRealTimeData(activity: string | any) {
    console.log('hola soy commn card fetch', activity);
    this.comment = activity;
  }
}
