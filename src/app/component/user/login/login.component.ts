import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  check = 'false';

  // tslint:disable-next-line:max-line-length
  constructor(private loginBuilder: FormBuilder , private authService: AuthService ,
              private cookieService: CookieService , private router: Router ,
              private userService: UserService) { }

  ngOnInit() {
    this.formLogin();
  }

  formLogin() {
    this.loginForm = this.loginBuilder.group( {
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    });
  }

  onSubmit() {
    this.logninUser();
  }
  logninUser() {
    console.log('Loginin');
    console.log(JSON.stringify(this.loginForm.value));
    this.authService.signin(this.loginForm.value).subscribe( next => {
      localStorage.setItem('token' , next.accessToken);
      localStorage.setItem('username' , next.username);
      this.authService.token = next.token;
      this.authService.header = new HttpHeaders(
        {
          Authorization: `Bearer ${this.authService.token}`,
          'Content-Type': 'application/json'
        }
      );
      if (next.accessToken) {
        this.router.navigateByUrl('/api/start');
        this.check = 'true';
      }
      console.log(next.accessToken);
    });
  }
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
  lognout() {
    this.userService.userLogout();
  }


}
