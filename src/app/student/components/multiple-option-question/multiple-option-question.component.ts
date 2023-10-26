import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { Answer, Question } from 'src/app/interfaces/poll.interface';

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
      let idAnswer = '' + answer._id;
      this.myOptions.addControl(idAnswer, this.formBuilder.control(false));
    });
    this.form.addControl(this.question._id, this.myOptions);
  }

  get answers() {
    return this.question['answers'];
  }

  get answersFormArray() {
    return this.form.get('answers') as FormArray;
  }

  onCheckboxChange(option: number, isChecked: boolean) {
    if (isChecked) {
      this.answersFormArray.push(new FormControl(option));
    } else {
      const index = this.answersFormArray.controls.findIndex(
        (x) => x.value === option
      );
      this.answersFormArray.removeAt(index);
    }
  }
}
