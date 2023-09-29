
// Definición de la interfaz Poll
export interface Poll {
  _id: string;
  pollTitle: string;
  startDate: Date;
  questions: Question[];
  __v: number;
}

// Definición de la interfaz Question
export interface Question {
  _id: string;
  type: string;
  question: string;
  answers: Answer[];
  __v: number;
}

// Definición de la interfaz Answer
export interface Answer {
  option: number;
  text: string;
  correct: boolean;
  _id: string;
}

// Inicialización de pollJson
export const pollJson: Poll = {
  _id: '6514b01a8c3c10f5b3e3134c',
  pollTitle: 'Customer Satisfaction Poll',
  startDate: new Date('2023-09-27T22:43:38.547Z'),
  questions: [
    {
      _id: '6514b01a8c3c10f5b3e3133e',
      type: 'Likert',
      question: 'How satisfied are you with our service?',
      answers: [
        {
          option: 1,
          text: 'Not Satisfied',
          correct: false,
          _id: '6514b01a8c3c10f5b3e3133f',
        },
        {
          option: 2,
          text: 'Somewhat Satisfied',
          correct: false,
          _id: '6514b01a8c3c10f5b3e31340',
        },
        {
          option: 3,
          text: 'Satisfied',
          correct: false,
          _id: '6514b01a8c3c10f5b3e31341',
        },
        {
          option: 4,
          text: 'Very Satisfied',
          correct: false,
          _id: '6514b01a8c3c10f5b3e31342',
        },
      ],
      __v: 0,
    },
  ],
  __v: 0,
};
