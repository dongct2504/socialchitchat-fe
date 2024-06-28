import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faHome, faMessage, faSignOut, faThumbsUp, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthenService } from 'src/app/authen/authen.service';
import { AppUserDto } from 'src/app/shared/models/appUserDtos/appUserDto';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  faBars = faBars;
  faUserCircle = faUserCircle;
  faUser = faUser;
  faSignOut = faSignOut;

  faHome = faHome;
  faThumsbup = faThumbsUp;
  faMessage = faMessage;

  currentUser$?: Observable<AppUserDto | null>;

  constructor(
    private authenService: AuthenService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.currentUser$ = this.authenService.currentUser$;
  }

  logout() {
    this.authenService.logout();
    this.toastr.success('Đăng xuất thành công!');
    this.router.navigate(['/']);
  }
}
