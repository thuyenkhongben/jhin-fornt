import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {UserOnline} from '../interface/user-online';
import {Role} from '../interface/role';
import {LoginInfo} from './login-info';
import {FormGroup} from '@angular/forms';
import {JwtResponse} from './jwtResponse';
import {SignUpInfor} from './SignUpInfor';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private  API_URL_LOGIN = 'http://localhost:5000/api/auth/signin';
  private  API_URL = 'http://localhost:5000/api/auth/signup';

  constructor(private http: HttpClient ) {
  }
  attemptAuth(credentials: LoginInfo): Observable< JwtResponse > {
    return this.http.post< JwtResponse >(this.API_URL_LOGIN , credentials , httpOptions);
  }
  signUp(info: SignUpInfor): Observable<string> {
    return this.http.post<string>(this.API_URL , info , httpOptions);
  }
}

