import { Component } from '@angular/core';
import { Poll, pollJson } from 'src/app/interfaces/poll.interface';

@Component({
  selector: 'app-my-poll',
  templateUrl: './my-poll.component.html',
  styleUrls: ['./my-poll.component.css']
})
export class MyPollComponent {
  questionIndex = 0;
  poll: Poll = pollJson;
  get currentQuestion() {
    return this.poll.questions[this.questionIndex];
  }

  navigateToNext() {
    this.questionIndex++;

    // Asegúrate de que el índice de la pregunta actual no supere el límite del número de preguntas.
    if (this.questionIndex >= this.poll.questions.length) {
      this.questionIndex = this.poll.questions.length - 1;
    }
  }
}
