import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Poll, Question, pollJson } from 'src/app/interfaces/poll.interface';
import { Jsonresponse } from 'src/app/models/responsejson.model';
import { PollsService } from 'src/app/services/polls.service';

@Component({
  selector: 'app-my-poll',
  templateUrl: './my-poll.component.html',
  styleUrls: ['./my-poll.component.css'],
})
export class MyPollComponent implements OnInit {
  questionIndex = 0;
  pollTitle: string = '';
  questions: Question[] = [];
  surveyForm: FormGroup = this.formBuilder.group({});
  buttonNext = 'Siguiente';
  buttonPrevious = 'Anterior';
  isPreviousButtonEnabled = false;
  pollID: string = '';
  surveyStatus: boolean = false;
  isAnswered: boolean = true;
  constructor(
    private router: Router,
    private pollService: PollsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.pollService.getAllPolls().subscribe((data) => {
      this.pollTitle = data.pollTitle;
      this.questions = data.questions;
      this.pollID = data._id;
      this.loadQuestion();
      console.log(this.surveyForm);
    });
  }
  get currentQuestion() {
    //this.isAnswered = this.isQuestionAnswered();
    return this.questions[this.questionIndex];
  }
  isQuestionAnswered() {
    if (this.surveyForm.invalid) {
      return true;
    }

    return false;
  }
  loadQuestion() {
    const question = this.currentQuestion;
    this.surveyForm.addControl('PollId', this.formBuilder.control(this.pollID));
  }

  navigateToNext() {
    if (this.surveyForm.valid) {
      this.questionIndex++;
      this.isAnswered = true;
    } else {
      this.isAnswered = false;
    }

    if (this.questionIndex + 1 == this.questions.length) {
      //sumamos uno ya que index comienza en 0
      this.buttonNext = 'Enviar';
    }
    // Asegúrate de que el índice de la pregunta actual no supere el límite del número de preguntas.
    if (this.questionIndex >= this.questions.length) {
      this.submitSurvey();
      this.router.navigate(['/student/my-success']);

      this.questionIndex = this.questions.length - 1;
    }
  }

  previousQuestion() {
    if (this.questionIndex > 0 && this.surveyForm.valid) {
      this.questionIndex--;
      this.buttonNext = 'Siguiente';
      this.isAnswered = true;
    }
    this.isAnswered = false;
  }

  submitSurvey() {
    console.log(this.surveyForm);
    if (this.surveyForm.valid) {
      const data = this.surveyForm.value;

      console.log('estoy en submitSurvey survey', data);
      const pollId = data.PollId;
      console.log(Object.keys(data));

      const pollResponses = Object.keys(data).reduce(
        (acc: Jsonresponse[], key) => {
          if (key !== 'PollId' && typeof data[key] === 'object') {
            const questionId = key;
            const options = data[key];
            acc.push({
              questionId,
              option: Object.keys(options)
                .filter((key) => options[key] === true)
                .map((element) => parseInt(element, 10)),
            });
          } else if (typeof data[key] === 'number') {
            acc.push({
              questionId: key,
              option: [data[key]],
            });
          }
          return acc;
        },
        []
      );
      const surveyDataForm = { pollID: pollId, questions: pollResponses };
      const jsonSurveyResponse = JSON.stringify(surveyDataForm, null, 2);
      console.log(jsonSurveyResponse);
    }
  }
}
