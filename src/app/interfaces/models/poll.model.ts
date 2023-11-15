export interface Datapoll {
  type: 'likert' | 'MultipleOption' | 'SingleOption';
  question: string;
  answer: answer;
}

export interface answer {
  option: number;
  text: string;
  correct: boolean;
}
