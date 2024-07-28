import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
      
        
        if (error instanceof HttpErrorResponse) {
            console.log(error,"error");
           errorMessage = `Error: ${error.error.message}`;
       
          // Server-side error
          //  errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
          if (error.status === 401) {
            // Handle unauthorized errors
            this.router.navigate(['/auth/login']);
          } else if (error.status === 403) {
            // Handle forbidden errors
            this.router.navigate(['/auth/login']);
            
          }  
        }
         // Optionally, display error message to the user
        //  console.error(errorMessage);

         return throwError(errorMessage);
      })
    );
  }
}
