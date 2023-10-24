import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PollsService } from 'src/app/services/polls.service';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  FormArray,
  AbstractControl,
} from '@angular/forms';

import { Answer, Poll, Question } from 'src/app/interfaces/poll.interface';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css'],
})
export class PollsComponent implements OnInit {
  constructor(
    private pollService: PollsService,
    private formBuilder: FormBuilder
  ) {}
  /* variables */
  currentQuestionIndex: number = 0;
  pollTitle: string = '';
  questions: Question[] = [];
  studentAnswers: any[] = [];
  grupo = this.formBuilder.group([]);
  surveyForm: FormGroup = this.formBuilder.group({});

  ngOnInit(): void {
    this.pollService.getAllPolls().subscribe((data) => {
      this.pollTitle = data.pollTitle;
      this.questions = data.questions;
      this.loadQuestion();
      console.log(this.surveyForm);
    });
  }

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }
  loadQuestion() {
    const question = this.currentQuestion;
    this.surveyForm.addControl(question._id, this.formBuilder.control(''));
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion() {
    this.saveAnswer();
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  submitSurvey() {
    console.log(this.surveyForm);
  }

  saveAnswer() {}
  onAnswerSelected(img: FormGroup) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('hola polls ', changes);
  }
}
