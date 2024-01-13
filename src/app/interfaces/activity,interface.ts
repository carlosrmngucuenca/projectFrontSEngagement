export interface Activity {
  activityType: string;
  roomId: string;
  text?: string;
  userId: string;
}

export interface DashboardActivity {
  activityType: string;
  count: number;
  roomId: string;
  createAt: Date;
  updatedAt: Date;
  historial: number[];
}

export interface RecordActivity {
  _id: string;
  activityType: string;
  userId: string;
  roomId: string;
  text: string;
  date: Date;
}

export interface CreateActivityCommentDTO
  extends Omit<Activity, 'text' | 'userId'> {
  text: string;
}
