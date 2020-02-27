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
    return this.http.post(`${this.API_URL}/signin`, userLogin);
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

  autoLogin(login: Login) {
    this.userLogin(login).subscribe(next => {
      for (const role of next.authorities) {
        if (role.authority === 'ROLE_ADMIN') {
          this.cookieService.set('username', 'Admin');
          this.cookieService.set('jwtToken', next.accessToken);
          window.sessionStorage.setItem('role', role.authority);
          this.router.navigate(['listProduct']);

          break;
        } else if (role.authority === 'ROLE_USER') {
          this.cookieService.set('username', next.username);
          this.cookieService.set('jwtToken', next.accessToken);
          this.cookieService.set('role', role.authority);
          this.router.navigate(['listProduct']);
        }
      }
      this.check = 'true';
    },
      error => {
      this.cookieService.delete('jwtToken');
      this.cookieService.delete('username');
      this.check = ' false';
      }
      );
  }
}
