import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Poll } from '../interfaces/poll.interface';
//import socketService
import { SocketService } from './socket.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const baseUrl = environment.jsonURL;

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
    private Http: HttpClient
  ) {
    this.socketService.on<Poll>('putPolls').subscribe((poll: Poll) => {
      this.setPoll(poll);
      this.isPollActivedSubject.next(true);
    });
  }
  setPoll(poll: Poll) {
    this.pollSubject.next(poll);
  }

  getPoll$(): Observable<Poll | null> {
    return this.poll$;
  }

  isPollActive$(): Observable<boolean> {
    return this.isPollActived$;
  }

  getAllPolls() {
    return this.Http.get<Poll>(`${baseUrl}`);
  }
}
