import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Picture} from './interface/Picture';
import {Product} from './Product';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  private PIC = 'http://localhost:5000/api/auth/picture';
  constructor(private http: HttpClient) { }

  createPicture(picture: Picture): Observable<Picture> {
    return this.http.post<Picture>(this.PIC + '/create' , picture);
  }
  listPicture(): Observable<Picture[]> {
    return this.http.get<Picture[]>(this.PIC + '/list');
  }
}
