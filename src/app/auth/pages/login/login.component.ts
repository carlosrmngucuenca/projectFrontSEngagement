import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  miFormulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.builForm();
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
      userPin: ['', [Validators.required, Validators.maxLength(5)]],
      userName: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }
  save(event: any) {
    if (this.miFormulario.valid) {
      console.log(this.miFormulario.value);
      this.router.navigate(['/student/Home']);
    } else {
      this.miFormulario.markAllAsTouched();
    }
  }
}
