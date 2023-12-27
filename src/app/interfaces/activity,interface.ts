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

export interface CreateActivityCommentDTO
  extends Omit<Activity, 'text' | 'userId'> {
  text: string;
}
