import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericResponse } from '../util';

@Injectable({
  providedIn: 'root',
})
export class LoginRegisterService {
  constructor(private http: HttpClient) {}

  public async register(
    username: string,
    email: string,
    password: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
        .get<GenericResponse>('/register', {
          params: { username, email, password },
        })
        .subscribe((res) => {
          if (res.success) {
            resolve();
          } else {
            reject(res.error);
          }
        });
    });
  }

  public async login(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
        .get<GenericResponse>('/login', { params: { email, password } })
        .subscribe((res) => {
          if (res.success) {
            resolve();
          } else {
            reject(res.error);
          }
        });
    });
  }

  public async logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get<GenericResponse>('/logout').subscribe((res) => {
        if (res.success) {
          resolve();
        } else {
          reject(res.error);
        }
      });
    });
  }

  public async logoutEverywhere(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get<GenericResponse>('/logout_everywhere').subscribe((res) => {
        if (res.success) {
          resolve();
        } else {
          reject(res.error);
        }
      });
    });
  }
}
