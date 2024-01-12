import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
declare var google: any;
@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(private router: Router) { }

  signOut(){
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/auth/login-dashboard'])
  }
}
