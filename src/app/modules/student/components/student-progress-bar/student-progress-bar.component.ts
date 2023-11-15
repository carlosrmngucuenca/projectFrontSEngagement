import { Component, Input, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { ButtonService } from 'src/app/services/button.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';

@Component({
  selector: 'student-progress-bar',
  templateUrl: './student-progress-bar.component.html',
  styleUrls: ['./student-progress-bar.component.css'],
})
export class StudentProgressBarComponent implements OnInit {
  @Input() textButton = '';
  @Input() imageUrl = '';
  @Input() altImg = '';
  progress: number = 0;
  private loveClassSubscription: Subscription = new Subscription();
  private sendCommentsSubscription: Subscription = new Subscription();
  private sleepSubscription: Subscription = new Subscription();
  private takeBreakSubscription: Subscription = new Subscription();
  private doNotGetItSubscription: Subscription = new Subscription();
  private progressSubscription: Subscription = new Subscription();
  constructor(
    private buttonService: ButtonService,
    private progressService: ProgressBarService
  ) {}
  ngOnInit() {
    this.progress = this.progressService.getProgress$();

    this.progressSubscription = this.progressService.progress$
      .pipe(
        map<number, number>((value) => {
          if (value > 100) {
            return 0;
          }
          return value;
        })
      )
      .subscribe((value) => {
        this.progress = value;
      });
  }

  ngOnDestroy() {
    this.loveClassSubscription.unsubscribe();
    this.sleepSubscription.unsubscribe();
    this.takeBreakSubscription.unsubscribe();
    this.doNotGetItSubscription.unsubscribe();
    this.progressSubscription.unsubscribe();
    this.progressService.setProgress(this.progress);
    console.log('onDestroy');
  }
}
