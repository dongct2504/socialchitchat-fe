import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationDto } from 'src/app/shared/models/authenticationDtos/authenticationDto';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authenJson = localStorage.getItem('datinglove-authen');

    if (authenJson) {
      const authen: AuthenticationDto = JSON.parse(authenJson);

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authen.token}`
        }
      })
    }

    return next.handle(request);
  }
}
