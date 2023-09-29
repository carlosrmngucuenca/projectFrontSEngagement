import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JoinRoom } from 'src/app/interfaces/join-room-event.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  miFormulario!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
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
      console.log(this.miFormulario.value);
      const { userPin } = this.miFormulario.getRawValue();
      const roomExists = true;
      const data:JoinRoom = {
        roomCode: userPin,
      };
      if (roomExists) {
        this.router.navigate(['/student/Home']);
      }

    } else {
      this.miFormulario.markAllAsTouched();
    }
  }
}
