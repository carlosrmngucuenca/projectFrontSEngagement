import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  sidebarWidth = true; // Initial width
  activeMenu = true;
  constructor(private sideBarService: SidebarService) {}
  toggleMenu() {
    this.activeMenu = !this.activeMenu;
    this.sidebarWidth = !this.sidebarWidth;
    this.sideBarService.setSidebarWidth(this.sidebarWidth);
  }
}
