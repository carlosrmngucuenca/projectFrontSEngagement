import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Poll, pollJson } from 'src/app/interfaces/poll.interface';

@Component({
  selector: 'app-my-poll',
  templateUrl: './my-poll.component.html',
  styleUrls: ['./my-poll.component.css']
})
export class MyPollComponent {
  questionIndex = 0;
  poll: Poll = pollJson;
  buttonNext = "Siguiente";
  constructor(private router: Router) { }
  get currentQuestion() {
    return this.poll.questions[this.questionIndex];
  }

  navigateToNext() {

    this.questionIndex++;
    if (this.questionIndex + 1 == this.poll.questions.length) {//sumamos uno ya que index comienza en 0
      this.buttonNext = "Enviar";
    }
    // Asegúrate de que el índice de la pregunta actual no supere el límite del número de preguntas.
    if (this.questionIndex >= this.poll.questions.length) {
      this.router.navigate(['/student/my-success']);
      this.questionIndex = this.poll.questions.length - 1;
    }
  }
}
