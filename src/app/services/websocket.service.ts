import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(private socket: Socket) {}

  public getSocket$(): Observable<any> {
    return new Observable((observer) => {
      try {
        this.socket.on('connect', () => {
          console.log('conectado');
        });
      } catch (e) {
        observer.error(e);
      }
    });
  }
}
