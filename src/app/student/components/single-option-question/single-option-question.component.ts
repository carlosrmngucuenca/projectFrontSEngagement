import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Question } from 'src/app/interfaces/poll.interface';

@Component({
  selector: 'app-single-option-question',
  templateUrl: './single-option-question.component.html',
  styleUrls: ['./single-option-question.component.css'],
})
export class SingleOptionQuestionComponent implements OnInit {
  @Input() question!: Question; // Replace 'any' with the appropriate question interface
  @Input() form!: FormGroup;
  myOption = this.formBuilder.group({});
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

    this.form.addControl(idQuestion, this.formBuilder.control(false));
  }
  get answers() {
    return this.question.answers;
  }

  saveOption(option: string | undefined) {
    console.log('hola', option);
  }
}
