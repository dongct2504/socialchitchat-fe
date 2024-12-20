import { Component, OnInit } from '@angular/core';
import { FollowDto } from '../../shared/models/followDtos/followDto';
import { faEnvelope, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { PageSizeConstants } from '../../shared/common/pageSizeConstants';
import { FollowParams } from '../../shared/models/followDtos/followParams';
import { UserService } from 'src/app/home/services/user.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {
  userFollows?: FollowDto[];
  isGetUserFollow = true;

  faUser = faUser;
  faHeart = faHeart;
  faEnvelope = faEnvelope;

  appUserFollowParams = new FollowParams();
  totalRecords = 0;

  constructor(private userService: UserService) {
    this.appUserFollowParams.pageSize = PageSizeConstants.pageSize12;
  }

  ngOnInit(): void {
    this.getUserFollowing();
  }

  getUserFollowing() {
    this.appUserFollowParams.predicate = 'following';
    this.isGetUserFollow = true;
    this.userService.getFollows(this.appUserFollowParams).subscribe(pagedList => {
      this.userFollows = pagedList.items;

      this.appUserFollowParams.pageNumber = pagedList.pageNumber;
      this.totalRecords = pagedList.totalRecords;
    })
  }

  getUserFollower() {
    this.appUserFollowParams.predicate = 'follower';
    this.isGetUserFollow = false;
    this.userService.getFollows(this.appUserFollowParams).subscribe(pagedList => {
      this.userFollows = pagedList.items;

      this.appUserFollowParams.pageNumber = pagedList.pageNumber;
      this.totalRecords = pagedList.totalRecords;
    })
  }

  onPageChanged(event: any) {
    this.appUserFollowParams.pageNumber = event.page;

    if (this.isGetUserFollow) {
      this.getUserFollowing();
    } else {
      this.getUserFollower();
    }
  }
}
