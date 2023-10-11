import { Component, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Question } from 'src/app/interfaces/poll.interface';

@Component({
  selector: 'app-multiple-option-question',
  templateUrl: './multiple-option-question.component.html',
  styleUrls: ['./multiple-option-question.component.css']
})
export class MultipleOptionQuestionComponent {
  @Input() question!: Question; // Reemplaza 'any' con la interfaz de pregunta adecuada

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      answers: new FormArray([])
    });
  }

  get answersFormArray() {
    return (this.form.get('answers') as FormArray);
  }

  get answers() {
    return this.question['answers'];
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
