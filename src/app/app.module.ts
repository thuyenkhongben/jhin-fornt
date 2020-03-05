import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CookieService} from 'ngx-cookie-service';

import { HeaderComponent } from './component/home/header/header.component';
import { FooterComponent } from './component/home/footer/footer.component';
import { RegisterComponent } from './component/user/register/register.component';
import { LoginComponent } from './component/user/login/login.component';
import { HomeUserComponent } from './component/user/home-user/home-user.component';
import { UpdatePasswordUserComponent } from './component/user/update-password-user/update-password-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { HomeComponent } from './component/home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    HomeUserComponent,
    UpdatePasswordUserComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
