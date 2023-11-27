export interface Activity {
  roomId: string;
  activityType: string;
  text?: string;
  userId: string;
}

export interface CreateActivitytDTO extends Omit<Activity, 'text'> {
  text: string;
}
