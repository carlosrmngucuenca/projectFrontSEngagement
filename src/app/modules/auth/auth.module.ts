import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginDashboardComponent } from './pages/login-dashboard/login-dashboard.component';

@NgModule({
  declarations: [LayoutComponent, LoginComponent, LoginFormComponent, LoginDashboardComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule

  ],
})
export class AuthModule { }
