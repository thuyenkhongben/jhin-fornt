import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from './category';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private CATEGORY_URL = 'http://localhost:5000/api/auth/category';
  constructor(private http: HttpClient) { }

  createCategory( category: Category): Observable<Category> {
    return  this.http.post<Category>(this.CATEGORY_URL + '/create', category);
  }
  getListIdCategory(count = 2 , id: number): Observable<Category[]> {
    return this.http.get<Category[]>(this.CATEGORY_URL + '/list' + id ).pipe(
      map(data => data.filter((todo , i) => i < count))
    );
  }
  listCategory(): Observable<Category[]> {
    return this.http.get<Category[]>( this.CATEGORY_URL + '/list');
  }
  updateCategory(category: Category): Observable<Category> {
    return this.http.put(`${this.CATEGORY_URL}/${category.categoryId}` , category);
  }
  deleteCategory(id: number): Observable<Category> {
    return this.http.delete< Category >(`${this.CATEGORY_URL}/${id}`);
  }
  getCategoryId(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.CATEGORY_URL}/${id}`);
  }
 }
