import { Injectable } from '@angular/core';
import {UserOnline} from '../interface/user-online';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Route, Router} from '@angular/router';
import {User} from '../interface/user';
import {Observable} from 'rxjs';
import {Login} from '../interface/login';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userOnline: UserOnline = {username: '', accessToken: ''};

  private API_URL = 'http://localhost:5000/api/auth';

  check = '';
  constructor(private http: HttpClient , private  cookieService: CookieService , private router: Router) { }

  createUser(user: User): Observable<User> {
    return this.http.post(`${this.API_URL}/signup`, user);
  }

  userLogin(userLogin: Login): Observable<UserOnline> {
    return this.http.post<UserOnline>(`${this.API_URL}/signin`, userLogin);
  }

  userDetails(): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.cookieService.get('jwtToken')
    });
    return this.http.get<User>(`${this.API_URL}/view/user/${this.userOnline.username}`, {headers});
  }

  updatePasswordUser(user: User): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.cookieService.get('jwtToken')
    });

    return this.http.put<User>(`${this.API_URL}/update/password/user`, user, {headers});
  }
}
