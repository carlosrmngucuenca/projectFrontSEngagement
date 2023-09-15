import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';

import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { EngagementComponent } from './components/engagement/engagement.component';
import { SurveyComponent } from './components/survey/survey.component';
import { PollsComponent } from './components/polls/polls.component';
import { MyPollComponent } from './pages/my-poll/my-poll.component';
import { HomeComponent } from './pages/home/home.component';
import { MySurveyComponent } from './pages/my-survey/my-survey.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    LoginComponent,
    NotFoundComponent,
    EngagementComponent,
    SurveyComponent,
    PollsComponent,
    MyPollComponent,
    HomeComponent,
    MySurveyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
