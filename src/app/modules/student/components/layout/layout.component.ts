import { Component } from '@angular/core';

@Component({
  selector: 'student-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  displayModal: boolean = false;

  openModal() {
    this.displayModal = true;
  }

  onOptionSelected(option: string) {
    this.navigateToHomePage();
    this.displayModal = false;
  }

  navigateToHomePage() {
    // Redirect to the home page
    // Example:
    // import { Router } from '@angular/router';
    // constructor(private router: Router) {}
    // this.router.navigate(['/home']);
  }
}
