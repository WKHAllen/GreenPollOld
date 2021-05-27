import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL, GenericResponse } from '../util';

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
        .get<GenericResponse>(APIURL + '/register', {
          params: { username, email, password },
          withCredentials: true,
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
        .get<GenericResponse>(APIURL + '/login', {
          params: { email, password },
          withCredentials: true,
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

  public async logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
        .get<GenericResponse>(APIURL + '/logout', {
          withCredentials: true,
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

  public async logoutEverywhere(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
        .get<GenericResponse>(APIURL + '/logout_everywhere', {
          withCredentials: true,
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
}
