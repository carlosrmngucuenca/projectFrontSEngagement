import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Question } from 'src/app/interfaces/poll.interface';

@Component({
  selector: 'app-likert-question',
  templateUrl: './likert-question.component.html',
  styleUrls: ['./likert-question.component.css'],
})
export class LikertQuestionComponent implements OnInit {
  @Input() question!: Question; // Replace 'any' with the appropriate question interface
  @Input() form!: FormGroup;
  myOptions = this.formBuilder.group({});

  ngOnInit() {
    this.buildForm();
  }
  constructor(private formBuilder: FormBuilder) {}
  buildForm() {
    let idQuestion = this.question._id;

    this.form.addControl(idQuestion, this.formBuilder.control(false));
  }
  get answers() {
    return this.question.answers;
  }
}
