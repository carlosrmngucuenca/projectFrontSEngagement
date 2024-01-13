import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { AuthGoogleService } from '../../../../services/auth-google.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  sidebarWidth = true; // Initial width
  activeMenu = true;
  constructor(
    private sideBarService: SidebarService,
    private router: Router,
    private tokenService: TokenService,
    private authGoogleService: AuthGoogleService
  ) {}
  toggleMenu() {
    this.activeMenu = !this.activeMenu;
    this.sidebarWidth = !this.sidebarWidth;
    this.sideBarService.setSidebarWidth(this.sidebarWidth);
  }

  goHome() {
    //this.toggleMenu();
    this.sideBarService.setSidebarWidth(this.sidebarWidth);
    this.router.navigateByUrl('/dashboard');
  }

  goDashboard() {
    //this.toggleMenu();
    this.sideBarService.setSidebarWidth(this.sidebarWidth);
    this.router.navigateByUrl('/dashboard/my-dashboard');
  }

  goComments() {
    this.sideBarService.setSidebarWidth(this.sidebarWidth);
    this.router.navigateByUrl('/dashboard/my-comments');
  }

  logout() {
    localStorage.clear();
    this.tokenService.removeToken();
    this.router.navigate(['/auth/login-dashboard']);
    this.authGoogleService.signOut();
  }
}
