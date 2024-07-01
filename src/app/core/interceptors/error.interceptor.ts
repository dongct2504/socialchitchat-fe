import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err) {
          switch (err.status) {
            case 400:
              if (err.error.errors) {
                const modelStateErrors = [];
                for (const key in err.error.errors) {
                  if (err.error.errors[key]) {
                    modelStateErrors.push(err.error.errors[key]); // push the value
                  }
                }
                throw modelStateErrors.flat();
              } else {
                this.toastr.error(err.error.detail, err.error.title);
              }
              break;

            case 401:
              this.toastr.error('You are unauthorize', 'Unauthorize');
              break;

            case 403:
              this.toastr.error('You don\'t have permission', 'Forbidden');
              break;

            case 404:
              this.router.navigate(['/notfound']);
              break;
            
            case 409:
              this.toastr.error(err.error.detail, err.error.title);
              break;
            
            case 500:
              const extras: NavigationExtras = { state: { error: err.error } };
              this.router.navigate(['/internal-server-error'], extras);
          }
        }

        return throwError(() => new Error(err));
      })
    )
  }
}
