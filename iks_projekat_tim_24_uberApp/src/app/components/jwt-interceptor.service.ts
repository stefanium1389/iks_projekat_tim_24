import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const jwt = localStorage.getItem('jwt');
    //console.log("JWT: ",jwt);
    if (jwt){
      const cloned = request.clone({
        setHeaders:{
          Authorization: `Bearer ${jwt}`
        }
      });
      return next.handle(cloned);
    }else{
      return next.handle(request);
    }
  } 
}
