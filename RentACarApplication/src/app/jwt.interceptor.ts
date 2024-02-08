import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';


@Injectable()
export class JwtInterceptor implements HttpInterceptor 
{
  localStorage: Storage;

  constructor(@Inject(DOCUMENT) private document: Document) {
   
    this.localStorage = document.defaultView?.localStorage;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    const token = this.localStorage?.getItem('access_token');
    if (token) {
      request = request.clone({
         setHeaders: {
           Authorization: `Bearer ${token}`
         }
       });
    }
    return next.handle(request);
  }

}
