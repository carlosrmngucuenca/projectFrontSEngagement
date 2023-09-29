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
