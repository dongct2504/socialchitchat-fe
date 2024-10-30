import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppUserDto } from '../../models/appUserDtos/appUserDto';
import { LikeDto } from '../../models/appUserLikeDtos/likeDto';
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
  @Input() userLikes?: LikeDto[];

  @Output() likeUnlikeEmitter = new EventEmitter<void>();

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

  isUserLiked(user: AppUserDto): boolean {
    return this.userLikes?.some(likedUser => likedUser.userId === user.id) || false;
  }

  updateLike(user: AppUserDto) {
    this.userService.updateLike(user.id).subscribe((isLike) => {
      if (isLike !== null && isLike !== undefined) {
        if (isLike) {
          this.toastr.success(`Bạn đã like ${user.nickname}`);
        } else {
          this.toastr.info(`Bạn đã bỏ like ${user.nickname}`);
        }
        this.likeUnlikeEmitter.emit();
      }
    });
  }
}
