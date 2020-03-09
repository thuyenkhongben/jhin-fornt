import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITY_KEY = 'AuthAuthority';
@Injectable({
  providedIn: 'root'
})
export class TokenStogeService {
  private  role: string;

  constructor() { }
  signOut() {
    window.localStorage.clear();
  }
  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }
  public saveUsername(username: string) {
    window.localStorage.removeItem(USERNAME_KEY);
    window.localStorage.setItem(USERNAME_KEY , username);
  }
  public getUsername(): string {
    return localStorage.getItem(USERNAME_KEY);
  }
  public saveAuthority(authority: string) {
    window.localStorage.removeItem(AUTHORITY_KEY);
    window.localStorage.setItem(AUTHORITY_KEY, JSON.stringify(authority));
  }
  public getAuthority(): string {
    this.role = '';
    if (localStorage.getItem(TOKEN_KEY)) {
      JSON.parse(localStorage.getItem(AUTHORITY_KEY));
    }
    return this.role;
  }
}
