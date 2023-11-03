import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'student-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  name: String = 'NIVELACIÓN';
  showDropdown: boolean = false;
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  redirect(option: string) {
    if (option === 'logout') {
    } else if (option === 'profile') {
    }
  }

  navigateToHomePage() {}
}
