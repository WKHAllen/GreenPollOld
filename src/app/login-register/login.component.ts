import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from './login-register.service';

interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'gp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  submittingForm = false;
  error = '';

  constructor(
    private loginRegisterService: LoginRegisterService,
    private router: Router
  ) {}

  onSubmit(form: LoginForm) {
    this.error = '';
    this.submittingForm = true;

    this.loginRegisterService
      .login(form.email, form.password)
      .then(() => this.router.navigate(['/']))
      .catch((err) => {
        this.submittingForm = false;
        this.error = err;
      });
  }
}
