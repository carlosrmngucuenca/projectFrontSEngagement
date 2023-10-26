import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Answer, Question } from 'src/app/interfaces/poll.interface';

@Component({
  selector: 'app-single-option-question',
  templateUrl: './single-option-question.component.html',
  styleUrls: ['./single-option-question.component.css'],
})
export class SingleOptionQuestionComponent implements OnInit {
  @Input() question!: Question; // Replace 'any' with the appropriate question interface
  @Input() form!: FormGroup;
  myOption = this.formBuilder.group({});
  previousAnswer = '';
  answerOption = '';
  constructor(private formBuilder: FormBuilder) {
    this.form = new FormGroup({
      answer: new FormControl(null),
    });
  }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    let idQuestion = this.question._id;

    this.form.addControl(this.question._id, this.myOption);
  }
  get answers() {
    return this.question.answers;
  }

  saveOption(answerId: string, answer: string) {
    const controlCount = Object.keys(this.myOption.controls).length;

    if (controlCount == 1) {
      this.myOption.removeControl(this.previousAnswer);
      this.myOption.addControl(answerId, this.formBuilder.control(answer));
      this.previousAnswer = answerId;
    } else {
      this.myOption.addControl(answerId, this.formBuilder.control(answer));
      this.previousAnswer = answerId;
    }
  }
}
