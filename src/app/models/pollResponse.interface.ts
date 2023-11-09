
export interface PollResponse  {
  pollId: number;
  responses: {
    questionId: string;
    option: number[];
  }[];
}

export default PollResponse;
