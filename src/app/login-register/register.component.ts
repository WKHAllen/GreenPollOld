import { Component } from '@angular/core';

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'gp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  model: RegisterForm = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  onSubmit(form: RegisterForm) {
    console.log(form);
  }
}
