import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Question } from 'src/app/interfaces/poll.interface';

@Component({
  selector: 'app-single-option-question',
  templateUrl: './single-option-question.component.html',
  styleUrls: ['./single-option-question.component.css']
})
export class SingleOptionQuestionComponent {
  @Input() question!: Question; // Replace 'any' with the appropriate question interface

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      answer: new FormControl(null)
    });
  }

  get answers() {
    return this.question.answers;
  }
}
