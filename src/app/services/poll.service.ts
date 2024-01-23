import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Poll } from '../interfaces/poll.interface';
//import socketService
import { SocketService } from './socket.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import PollResponse from '../interfaces/models/pollResponse.interface';
import { RoomService } from './room.service';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class PollService implements OnInit {
  private pollSubject = new BehaviorSubject<Poll | null>(null);
  public poll$ = this.pollSubject.asObservable();

  private isPollActivedSubject = new BehaviorSubject<boolean>(false);
  public isPollActived$ = this.isPollActivedSubject.asObservable();

  constructor(
    private socketService: SocketService,
    private http: HttpClient,
    private roomService: RoomService
  ) {
    this.socketService.on<Poll>('putPolls').subscribe((poll: Poll) => {
      this.pollSubject.next(poll);
      this.isPollActivedSubject.next(true);
    });
    this.socketService.on<string>('closePoll').subscribe((data) => {
      //console.log(data);
      this.isPollActivedSubject.next(false);
      this.isPollActived$ = this.isPollActivedSubject.asObservable();
      //clean local storage pollSaved
      this.deletePollSavedLocalStorage();
    });
  }

  ngOnInit(): void {
    //set poll saved in local storage
    //clean local storage
  }

  getPoll$(): Observable<Poll | null> {
    return this.poll$;
  }

  isPollActive$(): Observable<boolean> {
    return this.isPollActived$;
  }

  setPollActive$(isPollActive: boolean) {
    this.isPollActivedSubject.next(isPollActive);
    this.isPollActived$ = this.isPollActivedSubject.asObservable();
  }

  getAllPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>(`${baseUrl}/polls`);
  }

  //save poll with socket
  savePollResponses(pollResponse: PollResponse) {
    this.socketService.emit('savePollResponses', pollResponse);
  }

  setPollSavedLocalStorage(status: string) {
    localStorage.setItem('pollSaved', status);
  }
  getPollSavedLocalStorage() {
    return localStorage.getItem('pollSaved');
  }
  deletePollSavedLocalStorage() {
    localStorage.removeItem('pollSaved');
  }

  sendPoll(Poll: string) {
    const roomCode = this.roomService.getRoomCode();
    //const idPoll: string = '6577c3fd7be3e4528aac6277';
    const idPoll: string = Poll;
    const data = {
      roomCode: roomCode,
      idPoll: idPoll,
    };
    this.socketService.emit('sendPoll', data);
  }
  closePoll(Poll: string) {
    const roomCode = this.roomService.getRoomCode();
    //const idPoll: string = '6577c3fd7be3e4528aac6277';
    const idPoll: string = Poll;
    const data = {
      roomCode: roomCode,
      idPoll: idPoll,
    };
    this.socketService.emit('closePoll', data);
  }
}
