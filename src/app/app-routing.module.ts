import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './component/user/login/login.component';
import {RegisterComponent} from './component/user/register/register.component';
import {ListProductComponent} from './component/product/list-product/list-product.component';
import {HomeComponent} from './component/home/home.component';
import {StartComponent} from './start/start.component';
import {ListCategoryComponent} from './component/category/list-category/list-category.component';
import {CreateCategoryComponent} from './component/category/create-category/create-category.component';


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
       },
      {
        path: 'listCategory',
        component: ListCategoryComponent
      },
  {path: 'api/start/createCategory',
  component: CreateCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
