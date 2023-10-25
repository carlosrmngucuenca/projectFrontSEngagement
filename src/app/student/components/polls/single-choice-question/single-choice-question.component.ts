import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Answer, Question } from 'src/app/interfaces/poll.interface';

@Component({
  selector: 'app-single-choice-question',
  templateUrl: './single-choice-question.component.html',
  styleUrls: ['./single-choice-question.component.css'],
})
export class SingleChoiceQuestionComponent {
  @Input() question!: Question;
  @Input() form!: FormGroup;
  @Output() answerSelected = new EventEmitter<FormGroup>();
  myPoll = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    let idQuestion = this.question._id;

    this.form.addControl(idQuestion, this.formBuilder.control(false));

    console.log('single choice component', this.form);
  }

  selectAnswer() {
    this.answerSelected.emit(this.form);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Single choice', changes);
  }
}
