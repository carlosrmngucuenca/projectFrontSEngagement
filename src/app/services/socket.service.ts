import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JoinRoom } from '../interfaces/room/room.interface';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket) {

  }

  connect() {
    this.socket.connect();
    console.log('socket connected');
  }

  disconnect() {
    this.socket.disconnect();
    console.log('socket disconnected');
  }

  getSocket(): Socket {
    return this.socket;
  }

  emit<T>(event: string, data: T): Observable<T> {
    return this.socket.emit(event, data);
  }

  onUnauthorized(): Observable<string> {
    return this.on<string>('unauthorized');
  }

  onError(): Observable<string> {
    return this.on<string>('error');
  }

  onSuccess(): Observable<string> {
    return this.on<string>('success');
  }

  on<T>(event: string): Observable<T> {
    return this.socket.fromEvent<T>(event).pipe(
      map((data: T) => data as T)
    );
  }
}
