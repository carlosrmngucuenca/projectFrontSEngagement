import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Engagementcomponent } from 'src/app/interfaces/models/data.model';

@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.component.html',
  styleUrls: ['./engagement.component.css'],
})
export class EngagementComponent {
  @Input() engagementComponent: Engagementcomponent = {
    question: '',
  };

  @Input() data: any[] = [];

  @Output() addQuestion = new EventEmitter<string>();
  sendQestion() {
    this.addQuestion.emit(this.engagementComponent.question);
  }
}
