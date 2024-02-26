import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Answer, Question } from 'src/app/interfaces/poll.interface';
import { MyValidators } from 'src/app/utils/validators';
@Component({
  selector: 'app-multiple-option-question',
  templateUrl: './multiple-option-question.component.html',
  styleUrls: ['./multiple-option-question.component.css'],
})
export class MultipleOptionQuestionComponent implements OnInit {
  @Input() question!: Question;
  @Input() form!: FormGroup;
  myOptions = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();

  }
  buildForm() {
    
    this.question.answers.forEach((answer: Answer) => {
      let idAnswerOption = '' + answer.option;
      this.myOptions.addControl(
        idAnswerOption,
        this.formBuilder.control(false)
      );
    });
    this.form.addControl(this.question._id, this.myOptions);
    this.myOptions.setValidators(MyValidators.atLeastOneCheckedValidator());
  }

  get answers() {
    return this.question['answers'];
  }

  get isAnswered() {
    return (
      this.form.dirty === true && !this.form.get(this.question._id)?.errors
    );
  }
}
