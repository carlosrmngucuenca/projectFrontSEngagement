import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/*Componentes propios*/

import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { redirectGuard } from './guards/redirect.guard';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [redirectGuard],
    loadChildren: () =>
      import('./modules/auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'student',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/student/student.module').then((module) => module.StudentModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (module) => module.DashboardModule
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
