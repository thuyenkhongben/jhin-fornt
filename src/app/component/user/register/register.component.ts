import { Component, OnInit } from '@angular/core';
import {User} from '../../../interface/user';
import {Login} from '../../../interface/login';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User;
  login: Login;
  registerForm: FormGroup;
  check = '';
  checklaimk = '';
  constructor(private registerFormBuilder: FormBuilder, private userService: UserService , private cookieService: CookieService) { }

  checkPassword( group: FormGroup) {
    const password1 = group.get('password');
    const password2 = group.get('confirmPassword');
    // return password1 === password2 ? null : { notSame: true};
    if (password1 === password2) {
      return this.checklaimk = 'true';
    } else {
      return this.checklaimk = ' false';
    }
  }
  ngOnInit() {
    this.registerForm = this.registerFormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.checkPassword}
    );
  }

  onSubmit() {
    this.formUrl();
    this.userService.createUser(this.user).subscribe( next => {
      this.login = { username: this.registerForm.get('username').value , password: this.registerForm.get('password').value};
      this.userService.autoLogin(this.login);
      window.sessionStorage.setItem('password' , this.registerForm.get('password').value);
      this.check = 'true';
    },
      error => {
      this.check = 'false';
      }
      );
  }

  formUrl() {
    this.user = {
      name: this.registerForm.get('name').value,
      username: this.registerForm.get('username').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      role: ['admin']
    };
  }

}
