import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppUserDto } from '../../models/appUserDtos/appUserDto';
import { FollowDto } from '../../models/followDtos/followDto';
import { ToastrService } from 'ngx-toastr';
import { faEnvelope, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { PresenceService } from 'src/app/presence/services/presence.service';
import { UserService } from 'src/app/home/services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user?: AppUserDto;
  @Input() userFollows?: FollowDto[];

  @Output() followUnfollowEmitter = new EventEmitter<void>();

  faUser = faUser;
  faHeart = faHeart;
  faEnvelope = faEnvelope;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    public presenceService: PresenceService
  ) {
  }

  ngOnInit(): void {
  }

  isUserFollowed(user: AppUserDto): boolean {
    return Array.isArray(this.userFollows) && this.userFollows.some(followedUser => followedUser.userId === user.id) || false;
  }

  updateFollow(user: AppUserDto) {
    this.userService.updateFollow(user.id).subscribe((isFollow) => {
      if (isFollow !== null && isFollow !== undefined) {
        if (isFollow) {
          this.toastr.success(`Bạn đã follow ${user.nickname}`);
        } else {
          this.toastr.info(`Bạn đã unfollow ${user.nickname}`);
        }
        this.followUnfollowEmitter.emit();
      }
    });
  }
}
