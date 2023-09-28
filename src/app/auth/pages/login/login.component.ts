import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { WebsocketService } from 'src/app/services/websocket.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  miFormulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private socketService: WebsocketService,
    private socket: Socket
  ) {
    this.builForm();
  }

  ngOnInit(): void {
    // this.socketService.getSocket$().subscribe;
    const data = {
      roomCode: 'MRA123',
    };
    this.socketService.emitEvent('joinRoom', data);
  }

  get isPinValid() {
    return (
      this.miFormulario.get('userPin')?.valid &&
      this.miFormulario.get('userPin')?.touched
    );
  }

  get isPinInvalid() {
    return (
      this.miFormulario.get('userPin')?.invalid &&
      this.miFormulario.get('userPin')?.touched
    );
  }

  get isUserNameValid() {
    return (
      this.miFormulario.get('userName')?.valid &&
      this.miFormulario.get('userName')?.touched
    );
  }

  get isUserNameInvalid() {
    return (
      this.miFormulario.get('userName')?.invalid &&
      this.miFormulario.get('userName')?.touched
    );
  }

  private builForm() {
    this.miFormulario = this.formBuilder.group({
      userPin: ['', [Validators.required, Validators.maxLength(10)]],
      userName: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }
  save(event: any) {
    if (this.miFormulario.valid) {
      console.log(this.miFormulario.value);
      const { userPin, userName } = this.miFormulario.getRawValue();
      const data = {
        roomCode: userPin,
      };

      this.socketService.getSocket$().subscribe({
        next: () => {
          console.log('conectado');
        },
        error: (error) => {
          console.log(error);
        },
      });

      //this.socketService.emitEvent('joinRoom', data);

      this.router.navigate(['/student/Home']);
    } else {
      this.miFormulario.markAllAsTouched();
    }
  }
}
