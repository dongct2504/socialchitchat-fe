import { Component, OnInit } from '@angular/core';
import { AppUserDto } from '../../shared/models/appUserDtos/appUserDto';
import { UserParams } from '../../shared/models/appUserDtos/userParams';
import { PageSizeConstants } from '../../shared/common/pageSizeConstants';
import { take } from 'rxjs';
import { GenderEnum } from '../../shared/common/genderEnum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SortByConstants } from '../../shared/common/sortByConstants';
import { FollowDto } from '../../shared/models/followDtos/followDto';
import { AuthenService } from '../../authen/services/authen.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  filterForm = {} as FormGroup;

  users?: AppUserDto[];
  user?: AppUserDto;
  userFollows?: FollowDto[];

  userParams = new UserParams();
  totalRecords = 0;

  genderOptions = [
    { display: 'Nam', value: GenderEnum.male },
    { display: 'Nữ', value: GenderEnum.female },
    { display: 'Tất cả', value: GenderEnum.unknown }
  ];

  sortByOptions = [
    { display: 'Mới cập nhật', value: SortByConstants.lastActive },
    { display: 'Mới nhất', value: SortByConstants.created }
  ];

  constructor(
    private userService: UserService,
    private authenService: AuthenService,
    private fb: FormBuilder
  ) {
    this.authenService.currentUser$.pipe(take(1)).subscribe(currentUser => {
      if (currentUser) {
        this.user = currentUser;

        this.userParams = new UserParams();
        this.userParams.chooseDisplayGender(currentUser);
        this.userParams.pageSize = PageSizeConstants.pageSize12;
      }
    });
  }

  ngOnInit(): void {
    this.getUsers();
    this.getAllUserFollowing();
    this.initForm();
  }

  getAllUserFollowing() {
    this.userService.getAllFollows('following').subscribe(allUserFollows => {
      this.userFollows = allUserFollows;
    })
  }

  onPageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.getUsers();
  }

  filter() {
    this.userParams.minAge = this.filterForm.value.minAge;
    this.userParams.maxAge = this.filterForm.value.maxAge;
    this.userParams.gender = this.filterForm.value.gender;
    this.userParams.sortBy = this.filterForm.value.sortBy;
    this.userParams.pageNumber = 1;
    this.getUsers();
  }

  resetFilter() {
    if (this.user) {
      this.userParams = new UserParams();
      this.userParams.chooseDisplayGender(this.user);
      this.filterForm.reset({
        minAge: this.userParams.minAge,
        maxAge: this.userParams.maxAge,
        gender: this.userParams.gender,
        sortBy: this.userParams.sortBy
      });
    }
  }

  private getUsers() {
    this.userService.search(this.userParams).subscribe(pagedList => {
      this.users = pagedList.items;
      this.totalRecords = pagedList.totalRecords;
      this.userParams.pageNumber = pagedList.pageNumber;
    });
  }

  private initForm() {
    this.filterForm = this.fb.group({
      minAge: [this.userParams.minAge],
      maxAge: [this.userParams.maxAge],
      gender: [this.userParams.gender],
      sortBy: [this.userParams.sortBy]
    });
  }
}
