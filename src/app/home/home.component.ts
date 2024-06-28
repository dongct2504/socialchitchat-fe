import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { AppUserDto } from '../shared/models/appUserDtos/appUserDto';
import { UserParams } from '../shared/models/appUserDtos/userParams';
import { PageSizeConstants } from '../shared/common/pageSizeConstants';
import { faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users?: AppUserDto[];

  userParams = new UserParams();
  totalRecords = 0;

  faHeart = faHeart;
  faEnvelope = faEnvelope;

  constructor(private userService: UserService) {
    this.userParams.pageSize = PageSizeConstants.pageSize12;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getUsers(this.userParams).subscribe(pagedList => {
      this.users = pagedList.items;
      this.userParams.pageNumber = pagedList.pageNumber;
      this.totalRecords = pagedList.totalRecords;
    });
  }
}
