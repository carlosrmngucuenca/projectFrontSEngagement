import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Question } from 'src/app/interfaces/poll.interface';
import { PollService } from '../../../services/poll.service';

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
  showMessage = false;
  @Output() pollReceived = new EventEmitter<Boolean>();
  constructor(
    private router: Router,
    private pollService: PollService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.pollService.getPoll$().subscribe((poll) => {
      if (poll) {
        this.pollTitle = poll.pollTitle;
        this.questions = poll.questions;
        this.pollID = poll._id;
        this.loadQuestion();
      }
    });
  }
  get currentQuestion() {
    return this.questions[this.questionIndex];
  }
  loadQuestion() {
    const question = this.currentQuestion;
    this.surveyForm.addControl(
      'id_survey',
      this.formBuilder.control(this.pollID)
    );
  }

  navigateToNext() {
    if (this.surveyForm.valid) {
      this.questionIndex++;
    } else {
      this.showMessage = false;
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
      this.isPreviousButtonEnabled = true;
    }
    this.isPreviousButtonEnabled = false;
  }

  submitSurvey() {
    console.log("submit to send", this.surveyForm);
    if (this.surveyForm.valid) {
      console.log('hola submit survey');
    }
  }

}
