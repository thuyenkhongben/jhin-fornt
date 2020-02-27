import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './component/user/login/login.component';
import {RegisterComponent} from './component/user/register/register.component';


const routes: Routes = [

  {
    path: 'home',
    component: AppComponent,
  },
  {
    path: 'api/auth/login',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'api/auth/register',
    component: RegisterComponent
  },
  {
    path: 'auth/login/registered',
    component: RegisterComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
