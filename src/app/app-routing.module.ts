import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './component/user/login/login.component';
import {RegisterComponent} from './component/user/register/register.component';
import {ListProductComponent} from './component/product/list-product/list-product.component';
import {HomeComponent} from './component/home/home.component';

import {ListCategoryComponent} from './component/category/list-category/list-category.component';
import {CreateCategoryComponent} from './component/category/create-category/create-category.component';
import {ProductManagementComponent} from './component/admin/product-management/product-management.component';
import {CreateProductComponent} from './component/product/create-product/create-product.component';
import {EditProductComponent} from './component/product/edit-product/edit-product.component';
import {UpdateProductComponent} from './component/product/update-product/update-product.component';


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
      {path: 'api/listCategory' , component: ListCategoryComponent},
      {
        path: 'api/listManagement',
        component: ProductManagementComponent,
        children: [
          {path: 'createCategory' , component: CreateCategoryComponent},
          {path: 'listCategory' , component: ListCategoryComponent},
          {path: 'createProduct' , component: CreateProductComponent},
          {path: 'listProduct' , component: ListProductComponent},
          {path: 'detailsProduct/:id' , component: EditProductComponent},
          {path: 'updateProduct/:id' , component: UpdateProductComponent}
        ]
       },
      {
        path: 'api/listCategory',
        component: ListCategoryComponent
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
