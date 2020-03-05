import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private loginBuilder: FormBuilder , private userService: UserService , private cookieService: CookieService , private router: Router) { }

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
    if (this.loginForm.valid) {
      this.userService.autoLogin(this.loginForm.value);
      window.sessionStorage.setItem('password', this.loginForm.get('password').value);
    }
  }
  onSelect() {
    this.router.navigate(['register'])
  }

}
