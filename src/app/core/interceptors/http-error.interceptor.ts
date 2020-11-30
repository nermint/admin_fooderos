import {

    HttpEvent,
   
    HttpInterceptor,
   
    HttpHandler,
   
    HttpRequest,
   
    HttpResponse,
   
    HttpErrorResponse
   
   } from '@angular/common/http';
   
   import { Observable, throwError } from 'rxjs';
   
   import { retry, catchError } from 'rxjs/operators';
   
   
   // alertify
   declare let alertify:any;
   
   export class HttpErrorInterceptor implements HttpInterceptor {
   
    

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      return next.handle(request)
   
        .pipe(
   
          retry(1),
   
          catchError((error: HttpErrorResponse) => {
   
            let errorMessage = '';
   
            if (error.error instanceof ErrorEvent) {
   
              // client-side error
   
              errorMessage = `Error: ${error.error.message}`;
   
            } else {
   
              // server-side error
   
              errorMessage=error.message;
              switch(error.status){
                case 400:
                  //errorMessage ="Bad Request";
                  errorMessage="messages.invalid_otp"
                  break;
                case 401:
                  errorMessage="Unauthorized"
                  break;
                case 403:
                    errorMessage="Forbidden";
                    break;
                case 404:
                    errorMessage="Not found";
                    break;
                case 422:
                      errorMessage="Unprocessable Entity"
                      break;
            }
            
            }
            
            
         
            alertify.error(errorMessage);
            //window.alert(errorMessage);
           
   
            return throwError(errorMessage);
   
          })
   
        )
   
    }
   
   }