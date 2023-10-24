import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Poll } from '../interfaces/poll.interface';

const baseUrl = environment.baseUrl;
const jsonUrl = environment.jsonURL;
@Injectable({
  providedIn: 'root',
})
export class PollsService {
  constructor(private Http: HttpClient) {}

  getAllPolls() {
    return this.Http.get<Poll>(`${jsonUrl}`);
  }

  getQuestions() {
    return this.Http.get(`${baseUrl}/questions`);
  }
}
