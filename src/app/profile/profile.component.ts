import { Component, OnInit } from '@angular/core';
import { ProfileService, UserInfo } from './profile.service';

interface SetUsernameForm {
  username: string;
}

interface SetPasswordForm {
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'gp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userInfo: UserInfo | null = null;
  userInfoError = '';
  submittingUsernameForm = false;
  submittingPasswordForm = false;
  setUsernameError = '';
  setPasswordError = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService
      .getUserInfo()
      .then((userInfo) => {
        this.userInfo = userInfo;
        this.userInfo.join_time = (userInfo.join_time as number) * 1000;
      })
      .catch((err) => (this.userInfoError = err));
  }

  onSetUsernameSubmit(form: SetUsernameForm) {
    this.setUsernameError = '';

    if (form.username === this.userInfo?.username) {
      return;
    }
    if (form.username.length < 3 || form.username.length > 63) {
      this.setUsernameError = 'Username must be between 3 and 63 characters';
    }

    if (!this.setUsernameError) {
      this.submittingUsernameForm = true;

      this.profileService
        .setUsername(form.username)
        .then(() => {
          this.submittingUsernameForm = false;
          this.ngOnInit();
        })
        .catch((err) => {
          this.submittingUsernameForm = false;
          this.setUsernameError = err;
        });
    }
  }

  onSetPasswordSubmit(form: SetPasswordForm) {
    this.setPasswordError = '';

    if (form.password.length < 8 || form.password.length > 255) {
      this.setPasswordError = 'Password must be at least 8 characters';
    }
    if (form.password !== form.confirmPassword) {
      this.setPasswordError = 'Passwords do not match';
    }

    if (!this.setPasswordError) {
      this.submittingPasswordForm = true;

      this.profileService
        .setPassword(form.password)
        .then(() => {
          this.submittingPasswordForm = false;
        })
        .catch((err) => {
          this.submittingPasswordForm = false;
          this.setPasswordError = err;
        });
    }
  }
}
