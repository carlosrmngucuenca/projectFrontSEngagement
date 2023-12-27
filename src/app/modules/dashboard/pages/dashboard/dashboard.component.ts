import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    console.log('soy ngOnInit Del Dashboard');
  }

  ngOnDestroy() {
    console.log('onDestroy Dashboard');
  }
}
