import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JoinRoom, Room } from '../interfaces/room/room.interface';
import { RoomExists } from '../interfaces/room/room.interface';
import { TokenService } from './token.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = environment.baseUrl; // Reemplaza con la URL de tu backend
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private socketService: SocketService,
  ) { }

  roomId: string = '';
  private storageKey = 'roomId'; // Nombre clave para LocalStorage
  setRoomId(roomId: string) {
    this.roomId = roomId;
    localStorage.setItem(this.storageKey, roomId);
  }

  joinRoom(roomCode: string) {
    this.socketService.emit<JoinRoom>('joinRoom', { roomCode });
  }
  getRoomId(): string {
    const roomId = this.roomId || localStorage.getItem(this.storageKey);
    return roomId || '';
  }

  getRoomCode(): string | undefined {
    const payload = this.tokenService.decodeToken();
    const roomCode: string | undefined = payload?.roomCode;
    return roomCode;
  }
  logout() {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
  }

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/room`);
  }

  getRoomDetails(roomCode: string): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/room/${roomCode}`);
  }

  createRoom(name: string): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}/room`, { name });
  }

  updateRoom(id: string, changes: any): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/room/${id}`, changes);
  }

  patchRoom(id: string, newName: string): Observable<Room> {
    return this.http.patch<Room>(`${this.apiUrl}/room/${id}`, { newName });
  }

  checkRoomExists(roomCode: string): Observable<RoomExists> {
    return this.http.get<RoomExists>(`${this.apiUrl}/room/${roomCode}/exists`).pipe(
      tap((response) => {
        if (response.ok) {
          this.tokenService.saveToken(response.token);
          this.setRoomId(response.roomId);
        }
      })
    );
  }

  deleteRoom(roomCode: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/room/${roomCode}`);
  }

}
