import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {TokenStogeService} from '../../../auth/token-stoge.service';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private roles: string[];
  private authority: string;

  private info: any;

  constructor(private token: TokenStogeService, private router: Router) { }


  ngOnInit() {
    // this.info = {
    //   token: this.token.getToken(),
    //   username: this.token.getUsername(),
    //   authorities: this.token.getAuthorities()
    // };
    // console.log('token from Browser:' + this.info.token);
    // if (this.token.getToken()) {
    //   this.roles = this.token.getAuthorities();
    //   console.log(this.roles);
    //   for (const count of this.roles) {
    //     if ( count === 'ADMIN') {
    //       return this.authority = 'host';
    //     } else if ( count === 'USER') {
    //       return this.authority = 'user';
    //     }
    //   }
    //   }
    this.info = this.token.getAuthorities();
    console.log(this.info);
    for (const count of this.info) {
      if (count === 'ADMIN') {
        this.authority = 'host';
        return this.authority;
      } else  if (count === 'USER') {
        this.authority = 'user';
        return this.authority;
      }
    }
    }
  logout() {
    this.authority = null;
    this.token.signOut();
    this.router.navigate(['/home']);
    // this.ngOnInit();
  }

}
