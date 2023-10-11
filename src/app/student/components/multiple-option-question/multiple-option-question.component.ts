import { Component, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Question } from 'src/app/interfaces/poll.interface';

@Component({
  selector: 'app-multiple-option-question',
  templateUrl: './multiple-option-question.component.html',
  styleUrls: ['./multiple-option-question.component.css']
})
export class MultipleOptionQuestionComponent {
  @Input() question!: Question;

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      answers: new FormArray([])
    });
  }

  get answers() {
    return this.question['answers'];
  }

  get answersFormArray() {
    return (this.form.get('answers') as FormArray);
  }

  onCheckboxChange(option: number, isChecked: boolean) {
    if (isChecked) {
      this.answersFormArray.push(new FormControl(option));
    } else {
      const index = this.answersFormArray.controls.findIndex(x => x.value === option);
      this.answersFormArray.removeAt(index);
    }
  }
}
