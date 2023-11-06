import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { MyEngagementPollComponent } from './pages/my-engagement-poll/my-engagement-poll.component';
import { HomeComponent } from './pages/home/home.component';
import { MyPollComponent } from './pages/my-poll/my-poll.component';
import { MyDoubtComponent } from './pages/my-doubt/my-doubt.component';
import { MySuccessComponent } from './pages/my-success/my-success.component';
import { MyEmotionsComponent } from './pages/my-emotions/my-emotions.component';

import { redirectGuard } from './../guards/redirect.guard';
import { authGuard } from '../guards/auth.guard';
import { MyCommentComponent } from './pages/my-comment/my-comment.component';
import { MyBadgeComponent } from './pages/my-badge/my-badge.component';


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
        canActivate: [authGuard],
        component: HomeComponent,
      },
      {
        path: 'my-poll',
        canActivate: [authGuard],
        component: MyPollComponent,
      },
      {
        path: 'my-engagement-poll',
        canActivate: [authGuard],
        component: MyEngagementPollComponent,
      },
      {
        path: 'my-doubt',
        canActivate: [authGuard],
        component: MyDoubtComponent,
      },
      {
        path: 'my-comment',
        canActivate: [authGuard],
        component: MyCommentComponent,
      },
      {
        path: 'my-success',
        canActivate: [authGuard],
        component: MySuccessComponent,
      },
      {
        path: 'my-emotions',
        canActivate: [authGuard],
        component: MyEmotionsComponent,
      },
      {
        path: 'my-badge',
        canActivate: [authGuard],
        component: MyBadgeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
