import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthenService } from 'src/app/authen/services/authen.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authenService: AuthenService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authenService.currentUser$.pipe(
      map(currentUser => {
        if (currentUser) {
          return true;
        }
        this.router.navigate(['/authen/login'], { queryParams: { returnUrl: state.url } });
        return false;
      })
    )
  }
  
}
