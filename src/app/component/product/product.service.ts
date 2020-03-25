import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Product} from './Product';
import {Observable} from 'rxjs';
import {Category} from '../category/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL = 'http://localhost:5000/api/auth/products';
  private CATEGORY_URL = 'http://localhost:5000/api/auth/category';

  constructor(private http: HttpClient) { }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.API_URL + '/create' , product);
  }
  listProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL  + '/list');
  }
  listCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.CATEGORY_URL + '/list');
  }

  detailsProduct(id): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${id}` );
  }
  updateP(id , product): Observable<Product> {
    return this.http.put<Product>( `${this.API_URL}/${'update'}/${id}` , product);
  }
 }
