import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUserDetailDto } from 'src/app/shared/models/appUserDtos/appUserDetailDto';
import { AppUserDto } from 'src/app/shared/models/appUserDtos/appUserDto';
import { UpdateAppUserDto } from 'src/app/shared/models/appUserDtos/updateAppUserDto';
import { UserParams } from 'src/app/shared/models/appUserDtos/userParams';
import { FollowParams } from 'src/app/shared/models/followDtos/followParams';
import { FollowDto } from 'src/app/shared/models/followDtos/followDto';
import { PagedList } from 'src/app/shared/models/pagedList';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  public search(userParams?: UserParams): Observable<PagedList<AppUserDto>> {
    const params = this.initUserParams(userParams);
    return this.httpClient.get<PagedList<AppUserDto>>(`${this.apiUrl}/users/search`, { params });
  }

  public getById(id: string): Observable<AppUserDetailDto> {
    return this.httpClient.get<AppUserDetailDto>(`${this.apiUrl}/users/${id}`);
  }

  public getByUsername(username: string): Observable<AppUserDetailDto> {
    return this.httpClient.get<AppUserDetailDto>(`${this.apiUrl}/users/username/${username}`);
  }

  public update(id: string, updateAppUserDto: UpdateAppUserDto) {
    return this.httpClient.put(`${this.apiUrl}/users/${id}`, updateAppUserDto);
  }

  public setMainPicture(pictureId: string) {
    return this.httpClient.put(`${this.apiUrl}/pictures/set-main-picture/${pictureId}`, {});
  }

  public removePicture(pictureId: string) {
    return this.httpClient.delete(`${this.apiUrl}/pictures/remove-picture/${pictureId}`);
  }

  public getAllFollows(predicate: string): Observable<FollowDto[]> {
    return this.httpClient.get<FollowDto[]>(`${this.apiUrl}/follow`, { params: { predicate } });
  }

  public getFollows(appUserFollowParams: FollowParams): Observable<PagedList<FollowDto>> {
    const params = this.initAppUserFollowParams(appUserFollowParams);
    return this.httpClient.get<PagedList<FollowDto>>(`${this.apiUrl}/follow/get-follows`, { params });
  }

  public isUserFollowed(id: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.apiUrl}/follow/${id}`);
  }

  public updateFollow(id: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.apiUrl}/follow/${id}`, {});
  }

  private initUserParams(userParams?: UserParams): HttpParams {
    let params = new HttpParams();

    if (!userParams) {
      return params;
    }

    if (userParams.gender) {
      params = params.append('gender', userParams.gender);
    }
    if (userParams.name) {
      params = params.append('name', userParams.name);
    }

    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('minAge', userParams.minAge.toString());

    params = params.append('sortBy', userParams.sortBy);

    params = params.append('pageNumber', userParams.pageNumber.toString());
    params = params.append('pageSize', userParams.pageSize.toString());

    return params;
  }

  private initAppUserFollowParams(appUserFollowParams?: FollowParams): HttpParams {
    let params = new HttpParams();

    if (!appUserFollowParams) {
      return params;
    }

    params = params.append('predicate', appUserFollowParams.predicate);

    params = params.append('pageNumber', appUserFollowParams.pageNumber.toString());
    params = params.append('pageSize', appUserFollowParams.pageSize.toString());

    return params;
  }
}
