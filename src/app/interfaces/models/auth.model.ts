export interface ResponseLogin {
  access_token: string;
  refresh_token: string;
}
export interface ResponseLoginDashboard {
  ok: boolean;
  token: string;
  userId: string;
}
