import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JoinRoom } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {
    //el constructor se inicializa una sola vez
    this.onSuccess().subscribe((success) => {
      console.log(success);
    });
    this.onError().subscribe((error) => {
      console.error(error);
    });
  }

  connect() {
    this.socket.connect();
    //console.log('socket connected');
  }

  disconnect() {
    this.socket.disconnect();
    //console.log('socket disconnected');
  }

  getSocket(): Socket {
    return this.socket;
  }

  emit<T>(event: string, data: T, callback?: {}) {
    return this.socket.emit(event, data, callback);
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
    return this.socket.fromEvent<T>(event).pipe(map((data: T) => data as T));
  }
}
