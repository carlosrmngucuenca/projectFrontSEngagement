import { Injectable } from '@angular/core';
import { ValuemanagerService } from './valuemanager.service';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private valueManagerService: ValuemanagerService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  logout() {
    this.tokenService.removeToken();
    this.valueManagerService.resetValues();
    localStorage.clear();
    this.router.navigate(['/auth']);
  }
}
