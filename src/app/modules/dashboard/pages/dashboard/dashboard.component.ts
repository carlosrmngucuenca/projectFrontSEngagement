import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  sidebarWidth = true;
  private subscription: Subscription = new Subscription();
  constructor(private sideBarService: SidebarService) {
    this.sideBarService.getwidthObservable$().subscribe((data: boolean) => {
      this.sidebarWidth = data;
    });
  }

  ngOnInit(): void {
    console.log('soy ngOnInit Del Dashboard');
  }

  ngOnDestroy() {
    console.log('onDestroy Dashboard');
  }
}
