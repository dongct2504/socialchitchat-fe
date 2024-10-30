import { Component, OnInit } from '@angular/core';
import { LikeDto } from '../../shared/models/appUserLikeDtos/likeDto';
import { faEnvelope, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { PageSizeConstants } from '../../shared/common/pageSizeConstants';
import { AppUserLikeParams } from '../../shared/models/appUserLikeDtos/appUserLikeParams';
import { UserService } from 'src/app/home/services/user.service';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.css']
})
export class LikedComponent implements OnInit {
  userLikes?: LikeDto[];
  isGetUserLikes = true;

  faUser = faUser;
  faHeart = faHeart;
  faEnvelope = faEnvelope;

  appUserLikeParams = new AppUserLikeParams();
  totalRecords = 0;

  constructor(private userService: UserService) {
    this.appUserLikeParams.pageSize = PageSizeConstants.pageSize12;
  }

  ngOnInit(): void {
    this.getUserLikes();
  }

  getUserLikes() {
    this.appUserLikeParams.predicate = 'liked';
    this.isGetUserLikes = true;
    this.userService.getUserLikes(this.appUserLikeParams).subscribe(pagedList => {
      this.userLikes = pagedList.items;

      this.appUserLikeParams.pageNumber = pagedList.pageNumber;
      this.totalRecords = pagedList.totalRecords;
    })
  }

  getLikedByOthers() {
    this.appUserLikeParams.predicate = 'likedBy';
    this.isGetUserLikes = false;
    this.userService.getUserLikes(this.appUserLikeParams).subscribe(pagedList => {
      this.userLikes = pagedList.items;

      this.appUserLikeParams.pageNumber = pagedList.pageNumber;
      this.totalRecords = pagedList.totalRecords;
    })
  }

  onPageChanged(event: any) {
    this.appUserLikeParams.pageNumber = event.page;

    if (this.isGetUserLikes) {
      this.getUserLikes();
    } else {
      this.getLikedByOthers();
    }
  }
}
