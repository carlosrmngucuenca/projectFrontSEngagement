import { Component } from '@angular/core';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent {
  buttonEngagementOption: number = 0;
  /* varibles para medir la dimension Conduatual */
  behaviourLevel: number = 1;
  hideBehaviour: boolean = false;
  behaviourNumber: number = 0;

  /* varibles para medir la dimension Social */

  socialLevel: number = 1;
  socialNumber: number = 0;
  hideSocial: boolean = false;

  /* varibles para medir la dimension Cognitiva */
  cognitiveLevel: number = 1;
  hideCognitive: boolean = false;
  cognitiveNumber: number = 0;

  /* varibles para medir la dimension Affectiva */
  affectiveLevel: number = 1;
  hideAffective: boolean = false;
  affectiveNumber: number = 0;

  engagementComponents = [
    {
      icon: './../../../assets/icons/cognitive.svg',
      numberComponent: 1,
      hideComponent: false,
      type: 'behaviourComponent',
      question: 'esta seria la pregunta de este componente en particular',
    },

    {
      icon: './../../../assets/icons/social-icon.svg',
      numberComponent: 2,
      hideComponent: false,
      type: 'socialComponent',
      question: 'esta seria la pregunta de este componente en particular',
    },
    {
      icon: './../../../assets/icons/raise_hand-icon.svg',
      numberComponent: 3,
      hideComponent: false,
      type: 'behaviourComponent',
      question: 'esta seria la pregunta de este componente en particular',
    },
    {
      icon: './../../../assets/icons/emotions-icon.svg',
      numberComponent: 4,
      hideComponent: false,
      type: 'affectiveComponent',
      question: 'esta seria la pregunta de este componente en particular',
    },
  ];

  engagementMethod(index: number) {
    switch (index) {
      case 0:
        this.hideCognitive = false;
        this.hideSocial = true;
        this.hideBehaviour = true;
        this.hideAffective = true;
        this.buttonEngagementOption = 1;
        break;
      case 1:
        this.hideSocial = false;
        this.hideCognitive = true;
        this.hideBehaviour = true;
        this.hideAffective = true;
        this.buttonEngagementOption = 2;
        break;
      case 2:
        this.hideBehaviour = false;
        this.hideSocial = true;
        this.hideCognitive = true;
        this.hideAffective = true;
        this.buttonEngagementOption = 3;
        break;
      case 3:
        this.hideAffective = false;
        this.hideSocial = true;
        this.hideCognitive = true;
        this.hideBehaviour = true;
        this.buttonEngagementOption = 4;
        break;
      default:
        console.log('The button is unknown');
        break;
    }
  }

  addToQuestion(event: String) {
    console.log(event);
  }
}
