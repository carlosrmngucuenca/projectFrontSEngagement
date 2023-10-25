import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { SurveyComponent } from './components/survey/survey.component';
import { MySurveyComponent } from './pages/my-survey/my-survey.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from '../auth/pages/login/login.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { MyPollComponent } from './pages/my-poll/my-poll.component';
import { redirectGuard } from './../guards/redirect.guard';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'Auth',
        pathMatch: 'full',
      },
      {
        path: 'Auth',
        canActivate: [redirectGuard],
        loadChildren: () =>
          import('../auth/auth.module').then((module) => module.AuthModule),
      },
      {
        path: 'Home',
        canActivate: [authGuard],
        component: HomeComponent,
      },
      {
        path: 'Mypoll',
        canActivate: [authGuard],
        component: MyPollComponent,
      },
      {
        path: 'Mysurvey',
        canActivate: [authGuard],
        component: MySurveyComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
