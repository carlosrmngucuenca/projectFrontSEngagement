import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Answer, Question } from 'src/app/interfaces/poll.interface';
import { PollsService } from 'src/app/services/polls.service';

@Component({
  selector: 'app-multiple-choice-question',
  templateUrl: './multiple-choice-question.component.html',
  styleUrls: ['./multiple-choice-question.component.css'],
})
export class MultipleChoiceQuestionComponent implements OnInit {
  @Input() question!: Question;
  @Input() form!: FormGroup;
  @Output() answerSelected = new EventEmitter<FormGroup>();
  myPoll = this.formBuilder.group({});

  constructor(
    private pollService: PollsService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.question.answers.forEach((answer: Answer) => {
      let idQuestion = this.question._id + answer._id;

      this.myPoll.addControl(idQuestion, this.formBuilder.control(false));
    });

    this.form.addControl('options', this.myPoll);

    console.log(this.form);
  }

  selectAnswer() {
    this.answerSelected.emit(this.form);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Multiple choice', changes);
  }
}
