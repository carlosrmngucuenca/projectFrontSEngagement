export interface Poll {
  _id:       string;
  pollTitle: string;
  startDate: Date;
  questions: Question[];
  __v:       number;
}

export interface Question {
  _id:      string;
  type:     string;
  question: string;
  answers:  Answer[];
  __v:      number;
}

export interface Answer {
  option:  number;
  text:    string;
  correct: boolean;
  _id:     string;
}
