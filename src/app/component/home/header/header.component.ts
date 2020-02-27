import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService , private cookieService: CookieService , private router: Router) { }

  ngOnInit() {
    this.router.navigate(['listProduct']);
    this.userService.userOnline.username = this.cookieService.get('username');
    this.userService.userOnline.accessToken = this.cookieService.get('jwtToken');
    this.userService.userOnline.password = window.sessionStorage.getItem('password');
  }

  logout() {
    this.cookieService.delete('username');
    this.cookieService.delete('jwtToken');
    window.sessionStorage.getItem('password');

    this.userService.userOnline.username = '';
    this.userService.userOnline.accessToken = '';
    this.userService.userOnline.password = '';
    window.location.reload();
  }

}
