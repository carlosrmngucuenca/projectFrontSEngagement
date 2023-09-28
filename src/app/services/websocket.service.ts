import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Datapoll } from '../models/data.model';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  room: String = '';
  callback: EventEmitter<any> = new EventEmitter();
  constructor(private socket: Socket) {}

  public getSocket$(): Observable<any> {
    return new Observable((observer) => {
      try {
        this.socket.on('connect', () => {
          console.log('conectado');
          const data = {
            roomCode: 'MRA123',
          };
          this.socket.emit('joinRoom', data);
        });
      } catch (e) {
        observer.error(e);
      }
    });
  }

  emitEvent(evento: string, message = {}) {
    this.socket.emit(evento, message);
    console.log('websocketservice');
    // this.socket.on('connect', () => {
    //   console.log('conectado');
    //   const data = {
    //     roomCode: 'MRA123',
    //   };
    //   this.socket.emit(evento, data);
    // });
  }

  listenEvent() {
    this.socket.on('success', (res: string) => {
      this.callback.emit(res);
    });
  }

  listenAnuthorized(data: Datapoll) {
    this.socket.on('unauthorized', function (data: Datapoll) {
      console.log(data); //muestra mensaje de usuario no autorizado.
    });
  }

  listenSuccess(data: Datapoll) {
    this.socket.on('sucess', function (data: Datapoll) {
      console.log(data); //muestra mensaje de usuario no autorizado.
    });
  }

  listenError(data: Datapoll) {
    this.socket.on('error', function (data: Datapoll) {
      console.log(data); //muestra mensaje de usuario no autorizado.
    });
  }
}
