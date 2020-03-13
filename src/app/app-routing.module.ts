import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './component/user/login/login.component';
import {RegisterComponent} from './component/user/register/register.component';
import {ListProductComponent} from './component/product/list-product/list-product.component';
import {HomeComponent} from './component/home/home.component';
import {StartComponent} from './start/start.component';


const routes: Routes = [
      {
        path: 'api/login',
        component: LoginComponent
      },
      {
        path: 'api/register',
        component: RegisterComponent
      },
      {
        path: 'api/registered',
        component: RegisterComponent
      },
      {
        path: 'api/listProduct',
        component: ListProductComponent
      },
  {
    path: 'api/start',
    component: StartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
