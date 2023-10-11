import { Component } from '@angular/core';
import { EMOTION } from '../../enums/emotions.enum';

@Component({
  selector: 'app-my-emotions',
  templateUrl: './my-emotions.component.html',
  styleUrls: ['./my-emotions.component.css']
})
export class MyEmotionsComponent {
  EMOTION = EMOTION;
  emotion: EMOTION = EMOTION.HAPPY;
  onButtonClick(emotion: EMOTION) {
    this.emotion = emotion;
  }
}
