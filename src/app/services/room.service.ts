import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Room } from '../interfaces/room/room.interface';
import { RoomExistsResponse } from '../interfaces/room/room-exist-response.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = environment.baseUrl; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/room`);
  }

  getRoomDetails(roomCode: string): Observable<Room> {
    return this.http.get<Room>(`${this.baseUrl}/room/${roomCode}`);
  }

  createRoom(name: string): Observable<Room> {
    return this.http.post<Room>(`${this.baseUrl}/room`, { name });
  }

  updateRoom(id: string, changes: any): Observable<Room> {
    return this.http.put<Room>(`${this.baseUrl}/room/${id}`, changes);
  }

  patchRoom(id: string, newName: string): Observable<Room> {
    return this.http.patch<Room>(`${this.baseUrl}/room/${id}`, { newName });
  }

  checkRoomExists(roomCode: string): Observable<RoomExistsResponse> {
    return this.http.get<RoomExistsResponse>(`${this.baseUrl}/room/${roomCode}/exists`);
  }

  deleteRoom(roomCode: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/room/${roomCode}`);
  }

}
