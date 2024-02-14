import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyCommentsComponent } from './pages/my-comments/my-comments.component';
import { MyConfigroomComponent } from './pages/my-configroom/my-configroom.component';
import { MyPollsComponent } from './pages/my-polls/my-polls.component';
import { authDashboardGuard } from 'src/app/guards/auth-dashboard.guard';
import { MySurveyResultsComponent } from './pages/my-survey-results/my-survey-results.component';

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
        canActivate: [authDashboardGuard],
        path: 'home',
        component: HomeComponent,
      },
      {
        canActivate: [authDashboardGuard],
        path: 'my-dashboard',
        component: DashboardComponent,
      },
      {
        canActivate: [authDashboardGuard],
        path: 'my-comments',
        component: MyCommentsComponent,
      },
      {
        canActivate: [authDashboardGuard],
        path: 'my-configroom',
        component: MyConfigroomComponent,
      },
      {
        canActivate: [authDashboardGuard],
        path: 'my-polls',
        component: MyPollsComponent,
      },
      {
        canActivate: [authDashboardGuard],
        path: 'my-survey-results',
        component: MySurveyResultsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
