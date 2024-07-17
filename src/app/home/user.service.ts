import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AppUserDto } from '../shared/models/appUserDtos/appUserDto';
import { PagedList } from '../shared/models/pagedList';
import { UserParams } from '../shared/models/appUserDtos/userParams';
import { AppUserDetailDto } from '../shared/models/appUserDtos/appUserDetailDto';
import { UpdateAppUserDto } from '../shared/models/appUserDtos/updateAppUserDto';
import { LikeDto } from '../shared/models/appUserLikeDtos/likeDto';
import { AppUserLikeParams } from '../shared/models/appUserLikeDtos/appUserLikeParams';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getUsers(userParams?: UserParams): Observable<PagedList<AppUserDto>> {
    const params = this.initUserParams(userParams);
    return this.httpClient.get<PagedList<AppUserDto>>(`${this.apiUrl}/users`, { params });
  }

  getById(id: string): Observable<AppUserDetailDto> {
    return this.httpClient.get<AppUserDetailDto>(`${this.apiUrl}/users/${id}`);
  }

  getByUsername(username: string): Observable<AppUserDetailDto> {
    return this.httpClient.get<AppUserDetailDto>(`${this.apiUrl}/users/username/${username}`);
  }

  search(name: string): Observable<AppUserDto[]> {
    return this.httpClient.get<AppUserDto[]>(`${this.apiUrl}/users/search`, { params: { name } });
  }

  update(id: string, updateAppUserDto: UpdateAppUserDto) {
    return this.httpClient.put(`${this.apiUrl}/users/${id}`, updateAppUserDto);
  }

  setMainPicture(pictureId: string) {
    return this.httpClient.put(`${this.apiUrl}/pictures/set-main-picture/${pictureId}`, {});
  }

  removePicture(pictureId: string) {
    return this.httpClient.delete(`${this.apiUrl}/pictures/remove-picture/${pictureId}`);
  }

  getAllUserLikes(predicate: string): Observable<LikeDto[]> {
    return this.httpClient.get<LikeDto[]>(`${this.apiUrl}/likes`, { params: { predicate } });
  }

  getUserLikes(appUserLikeParams: AppUserLikeParams): Observable<PagedList<LikeDto>> {
    const params = this.initAppUserLikeParams(appUserLikeParams);
    return this.httpClient.get<PagedList<LikeDto>>(`${this.apiUrl}/likes/getUserLikes`, { params });
  }

  isUserLiked(id: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.apiUrl}/likes/${id}`);
  }

  updateLike(id: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.apiUrl}/likes/${id}`, {});
  }

  private initUserParams(userParams?: UserParams): HttpParams {
    let params = new HttpParams();

    if (!userParams) {
      return params;
    }

    if (userParams.gender != null && userParams.gender !== '') {
      params = params.append('gender', userParams.gender);
    }

    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('minAge', userParams.minAge.toString());

    params = params.append('sortBy', userParams.sortBy);

    params = params.append('pageNumber', userParams.pageNumber.toString());
    params = params.append('pageSize', userParams.pageSize.toString());

    return params;
  }

  private initAppUserLikeParams(appUserLikeParams?: AppUserLikeParams): HttpParams {
    let params = new HttpParams();

    if (!appUserLikeParams) {
      return params;
    }

    params = params.append('predicate', appUserLikeParams.predicate);

    params = params.append('pageNumber', appUserLikeParams.pageNumber.toString());
    params = params.append('pageSize', appUserLikeParams.pageSize.toString());

    return params;
  }
}
