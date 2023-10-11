import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StudentRoutingModule } from './student-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';

import { EngagementComponent } from './components/engagement/engagement.component';
import { SurveyComponent } from './components/survey/survey.component';
import { PollsComponent } from './components/polls/polls.component';
import { MyPollComponent } from './pages/my-poll/my-poll.component';
import { HomeComponent } from './pages/home/home.component';
import { MyEngagementPollComponent } from './pages/my-engagement-poll/my-engagement-poll.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MyDoubtComponent } from './pages/my-doubt/my-doubt.component';
import { TitlePageComponent } from './components/title-page/title-page.component';
import { ButtonImageTextComponent } from './components/button-image-text/button-image-text.component';
import { ButtonIconComponent } from './components/button-icon/button-icon.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonTextComponent } from './components/button-text/button-text.component';
import { MySuccessComponent } from './pages/my-success/my-success.component';
import { MyEmotionsComponent } from './pages/my-emotions/my-emotions.component';
import { LikertQuestionComponent } from './components/likert-question/likert-question.component';
import { SingleOptionQuestionComponent } from './components/single-option-question/single-option-question.component';
import { MultipleOptionQuestionComponent } from './components/multiple-option-question/multiple-option-question.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    EngagementComponent,
    SurveyComponent,
    PollsComponent,
    MyPollComponent,
    HomeComponent,
    MyEngagementPollComponent,
    LayoutComponent,
    MyDoubtComponent,
    TitlePageComponent,
    ButtonImageTextComponent,
    ButtonIconComponent,
    FooterComponent,
    ButtonTextComponent,
    MySuccessComponent,
    MyEmotionsComponent,
    LikertQuestionComponent,
    SingleOptionQuestionComponent,
    MultipleOptionQuestionComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
  ],
})
export class StudentModule {}
