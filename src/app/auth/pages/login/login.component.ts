import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RoomExistsResponse } from 'src/app/interfaces/room/room-exist-response.interface';
import { RoomService } from 'src/app/services/room.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isRoomInvalid: boolean = false; // Variable para rastrear si la sala no es válida
  miFormulario!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private roomService: RoomService
  ) {
    this.builForm();
  }

  ngOnInit(): void {

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
      userPin: ['MRA123', [Validators.required, Validators.maxLength(10)]],
      //userName: ['Felipe', [Validators.required, Validators.maxLength(10)]],
    });
  }
  save(event: any) {
    if (this.miFormulario.valid) {
      const { userPin } = this.miFormulario.getRawValue();

      // Verifica si la sala existe
      this.roomService.checkRoomExists(userPin).subscribe({
        next: (response: RoomExistsResponse) => {
          if (response.exists) {
            this.router.navigate(['/student/Home']);
          } else {
            this.isRoomInvalid = true;
            console.error('La sala no existe. Por favor, verifica el código de sala.');

          }
        },
        error: (error) => {
          console.error('Error al verificar la existencia de la sala:', error);
        }
      });
    } else {
      this.miFormulario.markAllAsTouched();

    }
  }
}
