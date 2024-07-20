import { Component, ViewChild } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@rybos/ngx-gallery';
import { AppUserDetailDto } from 'src/app/shared/models/appUserDtos/appUserDetailDto';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { MessageDto } from 'src/app/shared/models/messageDtos/messageDto';
import { MessagesService } from 'src/app/messages/messages.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  @ViewChild('userTabs') userTabs = {} as TabsetComponent;

  activeTab?: TabDirective;

  user?: AppUserDetailDto;
  isUserLike: boolean = false;
  messages: MessageDto[] = [];

  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private messagesService: MessagesService
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

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Nhắn tin' && this.messages.length === 0) {
      this.getMessageThread();
    }
  }

  private getUser() {
    const userName = this.route.snapshot.paramMap.get('username') || '';
    this.userService.getByUsername(userName).subscribe(user => {
      this.user = user;
      this.galleryImages = this.getImages();
      this.checkUserLike();
    });
  }

  private getMessageThread() {
    if (!this.user) {
      return;
    }

    this.messagesService.getMessageThread(this.user.id).subscribe(messages => {
      this.messages = messages;
    })
  }

  private checkUserLike() {
    if (this.user) {
      this.userService.isUserLiked(this.user.id).subscribe(isUserLike => {
        this.isUserLike = isUserLike;
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
}
