import { Injectable } from '@angular/core';
import { ValuemanagerService } from './valuemanager.service';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseLoginDashboard } from '../interfaces/models/auth.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.baseUrl;
  userRole: string = '';
  constructor(
    private valueManagerService: ValuemanagerService,
    private tokenService: TokenService,
    private router: Router,
    private http: HttpClient
  ) {}

  login(rol = '', token = ''): Observable<ResponseLoginDashboard> {
   // console.log('login service');
    const info = {
      rol: rol,
    };
    return this.http
      .post<ResponseLoginDashboard>(`${this.apiUrl}/auth/login`, info)
      .pipe(
        tap((res) => {
          console.log(res);
          if (res.ok) {
            this.tokenService.saveToken(res.token);
          }
        })
      );
  }

  setAndStoreUserRole(role: string = '') {
    localStorage.setItem('type-user', role);
  }

  getUserRole(): string {
    let storageKey = 'type-user';
    const userRole = this.userRole || localStorage.getItem(storageKey);
    //console.log('este es el rol del usuario', userRole);
    return userRole || '';
  }

  logout() {
    this.tokenService.removeToken();
    localStorage.clear();
    this.router.navigate(['/auth']);
    this.valueManagerService.resetValues();
  }
}
