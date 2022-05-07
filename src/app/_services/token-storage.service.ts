import { Injectable } from '@angular/core';

const KEY_TOKEN_AUTH = 'token-auth';
const KEY_USER_AUTH = 'user-auth';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(KEY_TOKEN_AUTH);
    window.localStorage.setItem(KEY_TOKEN_AUTH, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(KEY_TOKEN_AUTH);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(KEY_USER_AUTH);
    window.localStorage.setItem(KEY_USER_AUTH, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(KEY_USER_AUTH);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
