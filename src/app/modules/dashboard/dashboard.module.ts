import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyCommentsComponent } from './pages/my-comments/my-comments.component';
import { ExcellentClassChartComponent } from './components/excellent-class-chart/excellent-class-chart.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { DonnutsEmotionsComponent } from './components/donnuts-emotions/donnuts-emotions.component';
import { TakeAbreakChartComponent } from './components/take-abreak-chart/take-abreak-chart.component';
import { SleepChartComponent } from './components/sleep-chart/sleep-chart.component';
import { IDoNotGetItChartComponent } from './components/ido-not-get-it-chart/ido-not-get-it-chart.component';
import { MyConfigroomComponent } from './pages/my-configroom/my-configroom.component';
import { ConfigRoomFormComponent } from './components/config-room-form/config-room-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyPollsComponent } from './pages/my-polls/my-polls.component';
import { PollListComponent } from './components/poll-list/poll-list.component';
import { MySurveyResultsComponent } from './pages/my-survey-results/my-survey-results.component';
import { SurveyResultsChartComponent } from './components/survey-results-chart/survey-results-chart.component';

@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    DashboardComponent,
    MyCommentsComponent,
    ExcellentClassChartComponent,
    CommentCardComponent,
    DonnutsEmotionsComponent,
    TakeAbreakChartComponent,
    SleepChartComponent,
    IDoNotGetItChartComponent,
    MyConfigroomComponent,
    ConfigRoomFormComponent,
    MyPollsComponent,
    PollListComponent,
    MySurveyResultsComponent,
    SurveyResultsChartComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class DashboardModule {}
