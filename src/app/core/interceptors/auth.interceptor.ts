import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if( ! localStorage.getItem('Token')){
      request = request.clone({
        setHeaders: {
          ApplicationKey:environment.appKey
        }
      });
    }
    else{
      request = request.clone({
        setHeaders: {
          Authorization: localStorage.getItem('Token'),
          ApplicationKey:environment.appKey
        }
      });
    }

   

    return next.handle(request);
  }
}
