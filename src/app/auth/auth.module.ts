import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { config } from 'src/config/socket.config';
import { SocketIoModule } from 'ngx-socket-io';
@NgModule({
  declarations: [LayoutComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SocketIoModule.forRoot(config),
  ],
})
export class AuthModule {}
