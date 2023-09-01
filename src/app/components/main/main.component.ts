import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  /* varibles para medir la dimension Conduatual */
  participationLevel: number = 0;
  SocialLevel: number = 0;

  /* varibles para medir la dimension Afectiva */
  InterestLevel: number = 0;
  emtionLevel: number = 0;

  constructor() {}
}
