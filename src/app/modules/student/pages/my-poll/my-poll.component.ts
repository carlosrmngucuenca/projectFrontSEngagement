import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Question } from 'src/app/interfaces/poll.interface';
import { PollService } from '../../../../services/poll.service';
import { Jsonresponse } from 'src/app/interfaces/models/responsejson.model';
import { PollResponse } from 'src/app/interfaces/models/pollResponse.interface';
import { Subscription, tap } from 'rxjs';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-my-poll',
  templateUrl: './my-poll.component.html',
  styleUrls: ['./my-poll.component.css'],
})
export class MyPollComponent implements OnInit, OnDestroy {
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
  private pollSubscription: Subscription = new Subscription();
  numero: number = 0;
  constructor(
    private router: Router,
    private pollService: PollService,
    private roomService: RoomService,
    private formBuilder: FormBuilder,
  ) // private socketService: SocketService,
  { }
  ngOnDestroy(): void {
    // this.socketService.disconnect();
  }

  ngOnInit(): void {
    // this.socketService.connect();
    this.pollSubscription = this.pollService
      .getPoll$()
      .pipe(tap(console.log))
      .subscribe((poll) => {
        if (poll) {
          this.pollTitle = poll.pollTitle;
          this.questions = poll.questions;
          this.pollID = poll._id;

          this.loadQuestion();
        }
      });
  }
  get currentPollQuestion() {
    return this.questions[this.questionIndex];
  }
  isQuestionAnswered() {
    if (this.surveyForm.invalid) {
      return true;
    }

    return false;
  }
  loadQuestion() {
    //const question = this.currentQuestion;
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
    // console.log('submit to send', this.surveyForm);
    if (this.surveyForm.valid) {
      const data = this.surveyForm.value;

      // console.log('estoy en submitSurvey survey', data);
      const pollId = data.PollId;

      const responses = Object.keys(data)
        .filter((key) => key !== 'PollId')
        .map((key) => {
          let option: number[];
          if (typeof data[key] === 'number') {
            option = [data[key]];
          } else if (typeof data[key] === 'object') {
            option = Object.keys(data[key])
              .filter((subKey) => data[key][subKey])
              .map((subKey) => Number(subKey));
          } else {
            option = [];
          }
          return {
            questionId: key,
            option: option,
          };
        });
      const roomId=this.roomService.getRoomId();
      const pollResponse: PollResponse = {
        roomId:roomId,
        pollId: pollId,
        responses: responses,
      };
      console.log(pollResponse);
      this.pollService.savePollResponses(pollResponse);
    }
    this.pollService.setPollSavedLocalStorage('true');
  }
}
