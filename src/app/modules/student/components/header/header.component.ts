import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'student-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  name: String = 'MOTE APP';
  showDropdown: boolean = false;

  constructor(private authservice: AuthService) {}
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  redirect(option: string) {
    if (option === 'logout') {
      this.authservice.logout();
    }
  }
}
