import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
import { environment } from 'src/environments/environment';
declare var google: any;
//import environment from '../../../../../../environments/environment';
@Component({
  selector: 'app-login-dashboard',
  templateUrl: './login-dashboard.component.html',
  styleUrls: ['./login-dashboard.component.css']
})
export class LoginDashboardComponent implements OnInit {
  constructor(private router: Router, private roomService: RoomService,private ngZone: NgZone,private authService: AuthService,) { }
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (resp: any)=> this.handleLogin(resp)
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350
    })
  }

  private decodeToken(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(this.decodeBase64(base64));
  }

  private decodeBase64(base64: string) {
    const decodedString = atob(base64);
    return decodeURIComponent(Array.prototype.map.call(decodedString, (c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }


  handleLogin(response: any){
    if(response) {
      //decode the token
      const payLoad = this.decodeToken(response.credential);
      //store in session
      sessionStorage.setItem("loggedInUser", JSON.stringify(payLoad));
      //navigate to home/browse

      this.authService.login('admin').subscribe((res) => {
        console.log(res);

       //ng zone
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      });
    }

    }
}
