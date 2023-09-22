import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';

import { EngagementComponent } from './components/engagement/engagement.component';
import { SurveyComponent } from './components/survey/survey.component';
import { PollsComponent } from './components/polls/polls.component';
import { MyPollComponent } from './pages/my-poll/my-poll.component';
import { HomeComponent } from './pages/home/home.component';
import { MySurveyComponent } from './pages/my-survey/my-survey.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,

    EngagementComponent,
    SurveyComponent,
    PollsComponent,
    MyPollComponent,
    HomeComponent,
    MySurveyComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class StudentModule {}
