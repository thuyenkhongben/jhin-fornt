import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './component/user/login/login.component';
import {RegisterComponent} from './component/user/register/register.component';
import {ListProductComponent} from './component/product/list-product/list-product.component';


const routes: Routes = [

  {
    path: 'home',
    component: AppComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'registered',
    component: RegisterComponent
  },
  {
  path: 'listProduct',
    component: ListProductComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
