import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginDashboardComponent } from './pages/login-dashboard/login-dashboard.component';
import { redirectGuard } from 'src/app/guards/redirect.guard';
import { redirectDashboardGuard } from 'src/app/guards/redirect-dashboard.guard';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        canActivate: [redirectGuard],
        path: 'login',
        component: LoginComponent,
      },
      {
        canActivate: [redirectDashboardGuard],
        path: 'login-dashboard',
        component: LoginDashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
