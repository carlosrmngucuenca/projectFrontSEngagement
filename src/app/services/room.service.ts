import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JoinRoom, Room } from '../interfaces/room.interface';
import { RoomExists } from '../interfaces/room.interface';
import { TokenService } from './token.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private socketService: SocketService,
  ) { }

  roomId: string = '';
  userId: string = '';

  setRoomId(roomId: string) {
    let storageKey = 'roomId'; // Nombre clave para LocalStorage
    this.roomId = roomId;
    localStorage.setItem(storageKey, roomId);
  }
  setUserId(userId: string) {
    let storageKey = 'userId'; // Nombre clave para LocalStorage
    this.userId = userId;
    localStorage.setItem(storageKey, userId);
  }


  joinRoom(roomCode: string, token?: string) {
    if (!token) {
      token = this.tokenService.getToken();
    }

    this.socketService.emit<JoinRoom>('joinRoom', { roomCode, token });
  }
  //logout
  leaveRoom(roomCode: string, token?: string) {
    if (!token) {
      token = this.tokenService.getToken();
    }
    //clean local storage
    localStorage.clear();

    this.socketService.emit<JoinRoom>('leaveRoom', { roomCode, token });
  }

  getRoomId(): string {
    let storageKey = 'roomId';
    const roomId = this.roomId || localStorage.getItem(storageKey);
    return roomId || '';
  }
  getUserId(): string {
    let storageKey = 'userId';
    const userId = this.userId || localStorage.getItem(storageKey);
    return userId || '';
  }

  getRoomCode(): string | undefined {
    let storageKey = 'roomCode';
    const roomCode = localStorage.getItem(storageKey) || '';
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
    return this.http.post<Room>(`${this.apiUrl}/room`, { name }).pipe(
      tap((response) => {
        this.setRoomId(response._id);
        this.setRoomCode(response.code);
      })
    );
  }
  setRoomCode(roomCode: string) {
    let storageKey = 'roomCode'; // Nombre clave para LocalStorage
    localStorage.setItem(storageKey, roomCode);
  }
  updateRoom(id: string, changes: any): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/room/${id}`, changes);
  }

  patchRoom(id: string, newName: string): Observable<Room> {
    return this.http.patch<Room>(`${this.apiUrl}/room/${id}`, { newName });
  }

  checkRoomExists(roomCode: string, rol: string): Observable<RoomExists> {
    const headers = {
      'rol': rol
    };
    return this.http.get<RoomExists>(`${this.apiUrl}/room/${roomCode}/exists`, { headers }).pipe(
      tap((response) => {
        if (response.ok) {
          this.tokenService.saveToken(response.token);
          this.setRoomId(response.roomId);
          this.setUserId(response.userId);
          this.setRoomCode(roomCode);
        }
      })
    );
  }
  isRoomCreated(): boolean {
    //verify if roomId is in localStorage
    const roomId = this.getRoomId();
    return !!roomId;
  }

  deleteRoom(roomCode: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/room/${roomCode}`);
  }
}
