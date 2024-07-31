import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs';
import { AuthenService } from 'src/app/authen/authen.service';
import { AppUserDto } from 'src/app/shared/models/appUserDtos/appUserDto';

@Directive({
  selector: '[appHasRole]' // appHasRole="['admin', 'employee']"
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole?: string[];

  user?: AppUserDto;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authenService: AuthenService
  ) {
    this.authenService.currentUser$.pipe(take(1)).subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit(): void {
    // clear view if no roles
    if (this.user == null || !this.user?.roles) {
      this.viewContainerRef.clear();
      return;
    }

    if (this.user.roles.some(r => this.appHasRole?.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
