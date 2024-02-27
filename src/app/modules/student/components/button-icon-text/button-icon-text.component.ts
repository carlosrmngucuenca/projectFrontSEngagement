import { Component, Input } from '@angular/core';
import { ClickCounterService } from 'src/app/services/click-counter.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';

@Component({
  selector: 'student-button-icon-text',
  templateUrl: './button-icon-text.component.html',
  styleUrls: ['./button-icon-text.component.css'],
})
export class ButtonIconTextComponent {
  @Input() textButton = '';
  @Input() imageUrl = '';
  @Input() altImg = '';
  @Input() buttonColor: string = '';
  @Input() isEnabledPoll: boolean = false;
  infoSent = true;
  isLiked: boolean = false;
  constructor() {}
  toggleHeart() {
    this.isLiked = !this.isLiked;
  }
}
