import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Poll } from '../interfaces/poll.interface';
//import socketService
import { SocketService } from './socket.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import PollResponse from '../interfaces/models/pollResponse.interface';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private pollSubject = new BehaviorSubject<Poll | null>(null);
  public poll$ = this.pollSubject.asObservable();

  private isPollActivedSubject = new BehaviorSubject<boolean>(false);
  public isPollActived$ = this.isPollActivedSubject.asObservable();


  constructor(
    private socketService: SocketService,
    private http: HttpClient
  ) {
    this.socketService.on<Poll>('putPolls').subscribe((poll: Poll) => {
      this.pollSubject.next(poll);
      this.isPollActivedSubject.next(true);
    });
    this.socketService.on<string>('closePoll').subscribe((data) => {
      console.log(data);
      this.isPollActivedSubject.next(false);
      this.isPollActived$ = this.isPollActivedSubject.asObservable();
    });
  }

  getPoll$(): Observable<Poll | null> {
    return this.poll$;
  }

  isPollActive$(): Observable<boolean> {
    return this.isPollActived$;
  }


  setPollActive$(isPollActive: boolean) {
    this.isPollActivedSubject.next(isPollActive);
  }

  getAllPolls() {
    return this.http.get<Poll>(`${baseUrl}`);
  }

  //save poll with socket
  savePollResponses(pollResponse: PollResponse) {
    this.socketService.emit('savePollResponses', pollResponse);
  }


}
