import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@rybos/ngx-gallery';
import { AppUserDetailDto } from 'src/app/shared/models/appUserDtos/appUserDetailDto';
import { ActivatedRoute } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { PresenceService } from 'src/app/presence/services/presence.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthenService } from 'src/app/authen/services/authen.service';
import { UserService } from '../../services/user.service';
import { MessagesService } from 'src/app/messages/messages.service';
import { MessageDto } from 'src/app/shared/models/messageDtos/messageDto';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('userTabs', { static: true }) userTabs?: TabsetComponent;

  activeTab?: TabDirective;

  user = {} as AppUserDetailDto;
  isUserFollow: boolean = false;

  messages: MessageDto[] = [];
  pageNumber: number = 1;
  pageSize: number = 30;

  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  faUser = faUser;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private toastr: ToastrService,
    private authenService: AuthenService,
    public presenceService: PresenceService,
  ) {
  }

  ngOnInit(): void {
    this.getUser();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        previewKeyboardNavigation: true,
        previewZoom: true,
        previewRotate: true,
        previewFullscreen: true,
        previewDownload: true,
        previewArrows: true,
        thumbnailMargin: 5,
        thumbnailsMargin: 5
      },
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        thumbnailsColumns: 3,
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 10,
        thumbnailMargin: 10,
        preview: true,
      },
      {
        breakpoint: 400,
        width: '100%',
        height: '300px',
        thumbnailsColumns: 2,
        imagePercent: 75,
        thumbnailsPercent: 25,
        thumbnailsMargin: 5,
        thumbnailMargin: 5,
        preview: true
      }
    ];
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.selectTab(+params['tab']);
      } else {
        this.selectTab(0);
      }
    });
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Nhắn tin') {
      this.getMessageThread();
    } else {
      this.messagesService.stopHubConnection();
    }
  }

  updateFollow() {
    this.userService.updateFollow(this.user.id).subscribe((isFollow) => {
      if (isFollow !== null && isFollow !== undefined) {
        if (isFollow) {
          this.toastr.success(`Bạn đã follow ${this.user.nickname}`);
        } else {
          this.toastr.info(`Bạn đã unfollow ${this.user.nickname}`);
        }
        this.checkUserFollow();
      }
    });
  }

  private getUser() {
    const userName = this.route.snapshot.paramMap.get('username') || '';
    this.userService.getByUsername(userName).subscribe(user => {
      this.user = user;
      this.galleryImages = this.getImages();
      this.checkUserFollow();
    });
  }

  private getMessageThread() {
    if (!this.user) {
      return;
    }

    this.messagesService.getMessagesBetweenTwoUsers(this.user.id).subscribe(pagedList => {
      this.messages = pagedList.items;
      this.pageNumber = pagedList.pageNumber
    })
    const token = this.authenService.getToken();
    this.messagesService.createHubConnection(token, this.user.id);
  }

  private checkUserFollow() {
    if (this.user) {
      this.userService.isUserFollowed(this.user.id).subscribe(isUserFollow => {
        this.isUserFollow = isUserFollow;
      });
    }
  }

  private getImages() {
    const imageUrls: NgxGalleryImage[] = [];

    if (this.user && this.user.pictures) {
      for (const picture of this.user.pictures) {
        imageUrls.push({
          small: picture.imageUrl,
          medium: picture.imageUrl,
          big: picture.imageUrl
        });
      }
    }

    return imageUrls;
  }

  private selectTab(tabId: number) {
    if (this.userTabs) {
      this.userTabs.tabs[tabId].active = true;
    }
  }

  ngOnDestroy(): void {
    this.messagesService.stopHubConnection();
  }
}
