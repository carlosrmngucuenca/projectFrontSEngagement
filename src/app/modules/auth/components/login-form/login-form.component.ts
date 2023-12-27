import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestStatus } from 'src/app/interfaces/models/request-status.model';
import { RoomService } from '../../../../services/room.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'auth-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  isRoomInvalid: boolean = false; // Variable para rastrear si la sala no es válida
  miFormulario!: FormGroup;
  status: RequestStatus = 'init';
  baseUrl = environment.baseUrl;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private roomService: RoomService
  ) {
    this.builForm();
  }

  ngOnInit(): void {}

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

  private builForm() {
    this.miFormulario = this.formBuilder.group({
      userPin: ['MRA123', [Validators.required, Validators.maxLength(10)]],
    });
  }
  loginRoom() {
    if (this.miFormulario.valid) {
      const { userPin } = this.miFormulario.getRawValue();
      this.status = 'loading';

      this.roomService
        .checkRoomExists(userPin, 'user')
        .subscribe((roomExists) => {
          if (roomExists.ok) {
            this.router.navigateByUrl(`/student/my-emotions`);
          } else if (!roomExists.ok) {
            this.isRoomInvalid = true;
            this.miFormulario.markAllAsTouched();
          }
        });
    } else {
      this.miFormulario.markAllAsTouched();
    }
  }
}
