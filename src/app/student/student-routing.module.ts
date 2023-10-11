import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { MyEngagementPollComponent } from './pages/my-engagement-poll/my-engagement-poll.component';
import { HomeComponent } from './pages/home/home.component';
import { MyPollComponent } from './pages/my-poll/my-poll.component';
import { MyDoubtComponent } from './pages/my-doubt/my-doubt.component';
import { MySuccessComponent } from './pages/my-success/my-success.component';
import { MyEmotionsComponent } from './pages/my-emotions/my-emotions.component';


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
        path: 'auth',
        loadChildren: () =>
          import('../auth/auth.module').then((module) => module.AuthModule),
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'my-poll',
        component: MyPollComponent,
      },
      {
        path: 'my-engagement-poll',
        component: MyEngagementPollComponent,
      },
      {
        path: 'my-doubt',
        component: MyDoubtComponent,
      },
      {
        path: 'my-success',
        component: MySuccessComponent,
      },
      {
        path: 'my-emotions',
        component: MyEmotionsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
