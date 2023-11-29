export interface Activity {
  roomId: string;
  activityType: string;
  text?: string;
  userId: string;
}

export interface CreateActivityCommentDTO
  extends Omit<Activity, 'text' | 'userId'> {
  text: string;
}
