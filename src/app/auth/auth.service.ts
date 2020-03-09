import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'http://localhost:5000/api/auth/signin';
  private readonly RESET_PASSWORD_API_URL =  'http://localhost:5000/api/auth/reset-password';
  token: string;
  username: string;
  header: HttpHeaders;

  authenticate(user): Observable<any> {
    return this.http.post<any>(this.API_URL, user);
  }

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.username = localStorage.getItem('username');
    console.log(this.username);
    this.header = new HttpHeaders({
      'Content-Type': 'application/json' ,
      Authorization: `Bearer ${this.token}`
    });
  }

  signin(signinForm: FormGroup): Observable<any> {
    return this.http.post(this.API_URL , JSON.stringify(signinForm) , httpOptions);
  }
  userLogout() {
    window.localStorage.clear();
    window.location.replace('api/auth/signin');
  }
}
