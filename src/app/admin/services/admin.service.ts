import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUsersWithRolesDto } from 'src/app/shared/models/appUserDtos/appUsersWithRolesDto';
import { PagedList } from 'src/app/shared/models/pagedList';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getUsersWithRoles(): Observable<PagedList<AppUsersWithRolesDto>> {
    return this.httpClient.get<PagedList<AppUsersWithRolesDto>>(`${this.apiUrl}/admin/users-with-roles`);
  }

  public updateUsersWithRoles(id: string, roles: string[]): Observable<string[]> {
    return this.httpClient.post<string[]>(`${this.apiUrl}/admin/edit-roles/${id}?roles=${roles}`, {});
  }
}
