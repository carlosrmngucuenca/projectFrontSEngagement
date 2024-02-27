
export interface PollResponse  {
  roomId: string;
  pollId: number;
  responses: {
    questionId: string;
    option: number[];
  }[];
}



export default PollResponse;
