export interface Room {
  _id:       string;
  name:      string;
  users:     any[];
  code:      string;
  status:    boolean;
  endedAt?:  null;
  createdAt: Date;
  __v:       number;
}
export interface JoinRoom{
  roomCode: string | undefined;
  token: string | undefined;
}
//interface for exists room
export interface RoomExists {
  ok:     boolean;
  token: string;
  error?: string;
  roomId:  string;
}

