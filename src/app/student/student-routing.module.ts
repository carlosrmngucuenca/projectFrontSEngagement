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
        loadChildren: () =>
          import('../auth/auth.module').then((module) => module.AuthModule),
      },
      {
        path: 'Home',
        component: HomeComponent,
      },
      {
        path: 'Mypoll',
        component: MyPollComponent,
      },
      {
        path: 'Mysurvey',
        component: MySurveyComponent,
      },
      {
        path: 'MyDoubt',
        component: MyDoubtComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
