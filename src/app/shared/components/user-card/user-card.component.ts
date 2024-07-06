import { Component, Input, OnInit } from '@angular/core';
import { AppUserDto } from '../../models/appUserDtos/appUserDto';
import { LikeDto } from '../../models/appUserLikeDtos/likeDto';
import { UserService } from 'src/app/home/user.service';
import { ToastrService } from 'ngx-toastr';
import { faEnvelope, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user?: AppUserDto;
  @Input() userLikes?: LikeDto[];

  faUser = faUser;
  faHeart = faHeart;
  faEnvelope = faEnvelope;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  isUserLiked(user: AppUserDto): boolean {
    return this.userLikes?.some(likedUser => likedUser.userId === user.id) || false;
  }

  updateLike(user: AppUserDto) {
    this.userService.updateLike(user.id).subscribe(() => {
      this.toastr.success(`Bạn đã like ${user.nickname}`);
      this.getUserLikes();
    });
  }

  private getUserLikes() {
    const predicate = 'liked';
    this.userService.getUserLikes(predicate).subscribe(userLiked => {
      this.userLikes = userLiked;
    })
  }
}
