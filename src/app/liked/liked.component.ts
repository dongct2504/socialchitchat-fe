import { Component, OnInit } from '@angular/core';
import { LikeDto } from '../shared/models/appUserLikeDtos/likeDto';
import { UserService } from '../home/user.service';
import { faEnvelope, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { PageSizeConstants } from '../shared/common/pageSizeConstants';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.css']
})
export class LikedComponent implements OnInit {
  userLikes?: LikeDto[];
  predicate = 'liked';

  faUser = faUser;
  faHeart = faHeart;
  faEnvelope = faEnvelope;

  pageSize = PageSizeConstants.pageSize12;
  totalRecords = 0;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUserLikes();
  }

  getUserLikes() {
    this.predicate = 'liked';
    this.userService.getUserLikes(this.predicate).subscribe(userLiked => {
      this.userLikes = userLiked;
    })
  }

  getLikedByOthers() {
    this.predicate = 'likedBy';
    this.userService.getUserLikes(this.predicate).subscribe(userLiked => {
      this.userLikes = userLiked;
    })
  }
}
