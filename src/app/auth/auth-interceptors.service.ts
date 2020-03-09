import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorsService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = localStorage.getItem('token');
    if (token != null){
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY , 'bearer' + token)});
    }
    return next.handle(authReq);
  }
}
