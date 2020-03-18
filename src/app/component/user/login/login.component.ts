import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';
import {HttpHeaders} from '@angular/common/http';
import {error, log} from 'util';
import {LoginInfo} from '../../../auth/login-info';
import {TokenStogeService} from '../../../auth/token-stoge.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: LoginInfo;
  isSuccess = false;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required, Validators.minLength(6)
    ]),
  });

  constructor(private authService: AuthService , private tokenStorage: TokenStogeService,
              private router: Router , private fb: FormBuilder) {
  }
  ngOnInit() {
    this.formLogin();
  }
  formLogin() {
    console.log(this.loginForm.value);
    if (this.tokenStorage.getToken()) {
      console.log('token_:' + this.tokenStorage.getToken());
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }
  onSubmit() {
    const {username, password} = this.loginForm.value;
    const loginInfo = new LoginInfo(username, password);
    console.log(loginInfo);
// store to web browser;
    this.authService.attemptAuth(loginInfo).subscribe(
      responseJWT => {
        console.log('get UserName from BE:' + responseJWT.data.username);
        console.log('get token from BE:' + responseJWT.data.accessToken);
        this.tokenStorage.saveId(responseJWT.data.id);
        this.tokenStorage.saveToken(responseJWT.data.accessToken);
        this.tokenStorage.saveUsername(responseJWT.data.username);
        this.tokenStorage.saveAuthorities(responseJWT.data.roles);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        console.log('>>>>' + this.tokenStorage);
        // console.log(this.roles);
        for (const count of this.roles) {
          if (count === 'ADMIN') {
            this.router.navigate(['api/start']);
          } else  if (count === 'USER') {
            this.router.navigate(['api/listProduct']);
          }
        }
        // this.reloadPage();
      },
      // tslint:disable-next-line:no-shadowed-variable
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
        this.isSuccess = true;
      }
    );
  }

}
