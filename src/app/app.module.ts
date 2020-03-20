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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ListProductComponent } from './component/product/list-product/list-product.component';
import { CreateProductComponent } from './component/product/create-product/create-product.component';
import { UpdateProductComponent } from './component/product/update-product/update-product.component';
import { EditProductComponent } from './component/product/edit-product/edit-product.component';
import { DeleteProductComponent } from './component/product/delete-product/delete-product.component';
import { ListCategoryComponent } from './component/category/list-category/list-category.component';
import { CreateCategoryComponent } from './component/category/create-category/create-category.component';
import { ManagementListProductComponent } from './component/admin/management-list-product/management-list-product.component';
import { ManagementListOderComponent } from './component/admin/management-list-oder/management-list-oder.component';
import { ProductManagementComponent } from './component/admin/product-management/product-management.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    HomeUserComponent,
    HomeComponent,
    ListProductComponent,
    CreateProductComponent,
    UpdateProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    ListCategoryComponent,
    CreateCategoryComponent,
    ManagementListProductComponent,
    ManagementListOderComponent,
    ProductManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
