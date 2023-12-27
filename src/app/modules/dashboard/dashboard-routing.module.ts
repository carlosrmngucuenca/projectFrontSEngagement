import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyRealtimeComponent } from './pages/my-realtime/my-realtime.component';
import { MyConfigroomComponent } from './pages/my-configroom/my-configroom.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'my-dashboard',
        component: DashboardComponent,
      },
      {
        path: 'my-realtime',
        component: MyRealtimeComponent,
      },
      {
        path: 'my-configroom',
        component: MyConfigroomComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
