import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class socketService {
  constructor(private socket: Socket) {}

  connect() {
    this.socket.connect();
  }
  disconnect() {
    this.socket.disconnect();
  }

  // Emitir eventos al servidor
  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }
  onUnauthorized(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('unauthorized', (data: string) => observer.next(data));
    });
  }

  onError(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('error', (data: string) => observer.next(data));
    });
  }

  onSuccess(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('success', (data: string) => observer.next(data));
    });
  }
  // Escuchar eventos del servidor como Observable
  onEvent(event: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on(event, (data: any) => observer.next(data));
    });
  }
}

