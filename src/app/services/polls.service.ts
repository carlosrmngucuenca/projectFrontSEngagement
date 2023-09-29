import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class PollsService {

  constructor(private Http: HttpClient) {}

  getAllPolls() {
    return this.Http.get( `${ baseUrl }`);
  }
}
