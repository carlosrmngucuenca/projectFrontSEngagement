export interface JwtPayload {
  uid: string;
  roomCode: string;
  iat: number;
  exp: number;
}
