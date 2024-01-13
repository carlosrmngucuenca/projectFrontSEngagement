import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyCommentsComponent } from './pages/my-comments/my-comments.component';
import { MyConfigroomComponent } from './pages/my-configroom/my-configroom.component';
import { MyPollsComponent } from './pages/my-polls/my-polls.component';

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
        path: 'my-comments',
        component: MyCommentsComponent,
      },
      {
        path: 'my-configroom',
        component: MyConfigroomComponent,
      },
      {
        path: 'my-polls',
        component: MyPollsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
