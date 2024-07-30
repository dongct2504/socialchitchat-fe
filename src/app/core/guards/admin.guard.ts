import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthenService } from 'src/app/authen/authen.service';
import { RoleConstants } from 'src/app/shared/common/roleConstants';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authenService: AuthenService, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.authenService.currentUser$.pipe(
      map(user => {
        if (user && user.roles) {
          if (user.roles.includes(RoleConstants.admin) || user.roles.includes(RoleConstants.employee)) {
            return true;
          }
        }
        this.router.navigate(['/noufound']);
        return false;
      })
    )
  }

}
