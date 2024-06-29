import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUserDto } from '../shared/models/appUserDtos/appUserDto';
import { AppUserDetailDto } from '../shared/models/appUserDtos/appUserDetailDto';
import { AuthenService } from '../authen/authen.service';
import { UserService } from '../home/user.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  editForm = {} as FormGroup;

  authenUser?: AppUserDto | null;
  user?: AppUserDetailDto;

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private authenService: AuthenService,
    private userService: UserService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.authenService.currentUser$.pipe(take(1)).subscribe(authenUser => this.authenUser = authenUser)
  }

  ngOnInit(): void {
    this.initForm();
    this.loadMember();
  }

  private initForm() {
    this.editForm = this.fb.group({
      introduction: [this.user?.introduction || '', Validators.required],
      idealType: [this.user?.idealType || '', Validators.required],
      interest: [this.user?.interest || '', Validators.required],
      address: [this.user?.address || '', Validators.required],
      ward: [this.user?.ward || '', Validators.required],
      district: [this.user?.district || '', Validators.required],
      city: [this.user?.city || '', Validators.required]
    });
  }

  loadMember() {
    if (this.authenUser && this.authenUser) {
      this.userService.getById(this.authenUser.id).subscribe(user => {
        this.user = user;
      });
    }
  }

  updateMember() {
    if (this.user) {
      this.userService.update(this.user.id, this.user).subscribe(() => {
        this.toastr.success('Hồ sơ của bạn đã cập nhật thành công!');
        this.editForm.reset(this.user);
      });
    }
  }
}
