import { Component, OnInit } from '@angular/core';
import {User} from '../../../auth/interface/user';
import {Login} from '../../../auth/interface/login';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../auth/user.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from '../../../auth/auth.service';
import {SignUpInfor} from '../../../auth/SignUpInfor';
import {SignUpForm} from '../../../auth/interface/signup-form';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required , Validators.minLength(2)]),
    username: new FormControl('', [Validators.required , Validators.minLength(2)]),
    email: new FormControl('', [Validators.required , Validators.email]),
    password: new FormControl('', [ Validators.required , Validators.minLength(3)]),
    confirmPassword: new FormControl('', [ Validators.required , Validators.minLength(3)]),
  });
  signUpForm: SignUpForm;
  isSignedUp = false;
  isSigUPFailed = false;
  errorMessage = '';
  successSignUp = false;
  isNotSigUp = ' Wrong Username or Password';
  displaySigUp = false;
  message = 'the passwords do not match';
  displayMessage = false;
  constructor(private authService: AuthService , private router: Router) {
  }
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required , Validators.minLength(2)]),
      username: new FormControl('', [Validators.required , Validators.minLength(2)]),
      email: new FormControl('', [Validators.required , Validators.email]),
      password: new FormControl('', [ Validators.required , Validators.minLength(3)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  onSubmit() {
    const {name , username , email , password , confirmPassword} = this.form.value;
    this.signUpForm = new SignUpForm(name , username , email , password);

    if (password === confirmPassword) {
      this.authService.signUp(this.signUpForm).subscribe(
        data => {
          this.isSignedUp = true;
          this.isSigUPFailed = false;
          this.successSignUp = true;
          this.router.navigate(['api/login']).then(r => console.log(data)
          );
        }, error => {
          this.errorMessage = error.error.message;
          this.isSigUPFailed = true;
          this.displaySigUp = true;
        }
      );
    } else {
      this.displayMessage = true;
    }
  }

}
