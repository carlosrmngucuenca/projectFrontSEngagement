import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor() {}
  miFormulario = new FormGroup({
    nameField: new FormControl('', Validators.required),
    userPin: new FormControl('', [
      Validators.required,
      Validators.maxLength(5),
    ]),
    userName: new FormControl('', Validators.required),
  });

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

  save(event: any) {
    console.log(this.miFormulario);
  }
}
