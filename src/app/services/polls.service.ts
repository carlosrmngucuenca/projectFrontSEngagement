import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PollsService {
  private apiUrl = '';
  constructor(private Http: HttpClient) {}

  getAllPolls() {
    return this.Http.get(this.apiUrl);
  }
}
