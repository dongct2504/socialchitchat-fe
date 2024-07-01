import { Component, Input } from '@angular/core';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { AuthenService } from 'src/app/authen/authen.service';
import { UserService } from 'src/app/home/user.service';
import { AppUserDetailDto } from 'src/app/shared/models/appUserDtos/appUserDetailDto';
import { AppUserDto } from 'src/app/shared/models/appUserDtos/appUserDto';
import { PictureDto } from 'src/app/shared/models/pictureDtos/pictureDto';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-picture-edit',
  templateUrl: './picture-edit.component.html',
  styleUrls: ['./picture-edit.component.css']
})
export class PictureEditComponent {
  @Input() user?: AppUserDetailDto;

  private baseUrl = environment.apiUrl;

  uploader = {} as FileUploader;
  hasBaseDropZoneOver = false;

  authenUser?: AppUserDto | null;

  faUpload = faUpload;
  faTrash = faTrash;

  constructor(private authenService: AuthenService, private userService: UserService) {
    this.authenService.currentUser$.pipe(take(1)).subscribe(authenUser => this.authenUser = authenUser);
  }

  ngOnInit(): void {
    this.initUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initUploader() {
    const token = this.authenService.getToken();

    if (token !== '') {
      this.uploader = new FileUploader({
        url: `${this.baseUrl}/pictures/upload-picture`,
        authToken: `Bearer ${token}`,
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 10 * 1024 * 1024
      });

      this.uploader.onAfterAddingFile = (file) => {
        file.withCredentials = false;
      }

      this.uploader.onBuildItemForm = (fileItem, form) => {
        form.append('imageFile', fileItem._file, fileItem.file.name);
      }

      this.uploader.onSuccessItem = (item, response, status, headers) => {
        if (response) {
          if (this.user) {
            const picture: PictureDto = JSON.parse(response);
            this.user.pictures?.push(picture);

            if (picture.isMain) {
              if (this.authenUser) {
                this.authenUser.profilePictureUrl = picture.imageUrl;
                this.authenService.setUser(this.authenUser);
              }
              this.user.profilePictureUrl = picture.imageUrl;
            }
          }
        }
      }
    }
  }

  setMainPicture(picture: PictureDto) {
    this.userService.setMainPicture(picture.pictureId).subscribe(() => {
      // set main picture in navbar
      if (this.authenUser) {
        this.authenUser.profilePictureUrl = picture.imageUrl;
        this.authenService.setUser(this.authenUser);
      }

      if (this.user) {
        this.user.profilePictureUrl = picture.imageUrl;
        this.user.pictures?.forEach(p => {
          if (p.isMain) {
            p.isMain = false;
          }
          if (p.pictureId === picture.pictureId) {
            p.isMain = true;
          }
        });
      }
    });
  }

  removePicture(picture: PictureDto) {
    this.userService.removePicture(picture.pictureId).subscribe(() => {
      if (this.user && this.user.pictures) {
        this.user.pictures = this.user.pictures.filter(p => p.pictureId !== picture.pictureId);
      }
    });
  }
}
