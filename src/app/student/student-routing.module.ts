import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { SurveyComponent } from './components/survey/survey.component';
import { MySurveyComponent } from './pages/my-survey/my-survey.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from '../auth/pages/login/login.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
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
        redirectTo: 'auth',
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
        path: 'mypoll',
        component: MyPollComponent,
      },
      {
        path: 'mysurvey',
        component: MySurveyComponent,
      },
      {
        path: 'mydoubt',
        component: MyDoubtComponent,
      },
      {
        path: 'mysuccess',
        component: MySuccessComponent,
      },
      {
        path: 'myemotions',
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
