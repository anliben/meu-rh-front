import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { UserEntity } from '../interfaces/user/user.interface';
import { UserLogin } from '../interfaces/user/user-login.interface';
import { UserRegister } from '../interfaces/user/user-register.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  private endpoint = `http://localhost:5142/api/`;
  private lastUrl!: string;
  private token: string = '';

  get obterTokenUsuario(): any {
    const token = localStorage.getItem('token')

    if (token != null || undefined) {
      return token!
    }
    else {
      return null
    }
  }

  constructor() {
    this.loadCredentials();
  }

  isLoggedIn(): boolean {
    return this.loadCredentials();
  }

  handleLoggin(path: string = this.lastUrl): void {
    this.router.navigate(['login']);
  }

  private loadCredentials(): boolean {
    if (this.token === undefined || this.token === '') {
      const token = localStorage.getItem('token');

      if (token) {
        this.token = token;
      }
    }

    const loaded: boolean = this.token == '' ? false : true;

    if (!loaded) {
      this.unRegisterCredentials();
    }

    return loaded;
  }

  private unRegisterCredentials(): void {
    this.token = '';
    localStorage.removeItem('token');
  }

  sign(user: UserLogin): Observable<UserEntity> {
    return this.httpClient.post<UserEntity>(`${this.endpoint}User/validate`, user).pipe(
      tap(access_token => this.registerCredentials(access_token)),
      take(1)
    );
  }

  signUp(user: UserRegister) {
    return this.httpClient.post<UserEntity>(`${this.endpoint}User`, user).pipe(take(1));
  }

  updateUser(user: any) {
    return this.httpClient.put(`${this.endpoint}User/${user.ID}`, user).pipe(take(1));
  }

  userList() {
    return this.httpClient.get(`${this.endpoint}User`).pipe(take(1));
  }

  deleteUser(user: any) {
    return this.httpClient.delete(`${this.endpoint}User/` + user.ID).pipe(take(1));
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  private registerCredentials(user: UserEntity): void {
    this.token = user.email;
    localStorage.setItem('token', JSON.stringify(user.email));
  }
}