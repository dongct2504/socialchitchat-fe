import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AppUserDto } from '../shared/models/appUserDtos/appUserDto';
import { PagedList } from '../shared/models/pagedList';
import { UserParams } from '../shared/models/appUserDtos/userParams';
import { AppUserDetailDto } from '../shared/models/appUserDtos/appUserDetailDto';

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

  update(id: string, userDetail: AppUserDetailDto) {
    return this.httpClient.put(`${this.apiUrl}/users/${id}`, userDetail);
  }

  setMainPicture(pictureId: string) {
    return this.httpClient.put(`${this.apiUrl}/users/set-main-picture/${pictureId}`, {});
  }

  removePicture(pictureId: string) {
    return this.httpClient.delete(`${this.apiUrl}/users/remove-picture/${pictureId}`);
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

    params = params.append('pageNumber', userParams.pageNumber.toString());
    params = params.append('pageSize', userParams.pageSize.toString());

    return params;
  }
}
