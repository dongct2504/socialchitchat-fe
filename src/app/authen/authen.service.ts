import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment.development';
import { LoginAppUserDto } from '../shared/models/authenticationDtos/loginAppUserDto';
import { AuthenticationDto } from '../shared/models/authenticationDtos/authenticationDto';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { RegisterAppUserDto } from '../shared/models/authenticationDtos/registerAppUserDto';
import { AppUserDto } from '../shared/models/appUserDtos/appUserDto';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  private apiUrl = environment.apiUrl;

  private currentUserSource = new BehaviorSubject<AppUserDto | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  public login(loginRequest: LoginAppUserDto): Observable<void> {
    return this.httpClient.post<AuthenticationDto>(`${this.apiUrl}/authen/login`, loginRequest).pipe(
      map(res => {
        if (res) {
          const authenDto = res as AuthenticationDto;
          this.setUser(authenDto);
        }
      })
    );
  }

  public register(registerRequest: RegisterAppUserDto): Observable<AuthenticationDto> {
    return this.httpClient.post<AuthenticationDto>(`${this.apiUrl}/authen/register`, registerRequest);
  }

  public loadCurrentUser() {
    const authenJson = localStorage.getItem('datinglove-authen');
    if (authenJson) {
      const authen: AuthenticationDto = JSON.parse(authenJson);
      this.currentUserSource.next(authen.appUserDto);
    }
  }

  public logout() {
    localStorage.removeItem('datinglove-authen');
    this.currentUserSource.next(null);
  }

  private setUser(authenDto: AuthenticationDto) {
    localStorage.setItem('datinglove-authen', JSON.stringify(authenDto));
    this.currentUserSource.next(authenDto.appUserDto);
  }
}
