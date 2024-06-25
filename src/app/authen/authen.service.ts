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
    return this.httpClient.post<AuthenticationDto>(`${this.apiUrl}/auth/login`, loginRequest).pipe(
      map(res => {
        if (res) {
          const authenDto = res as AuthenticationDto;
          this.setUser(authenDto);
        }
      })
    );
  }

  public register(registerRequest: RegisterAppUserDto): Observable<AuthenticationDto> {
    return this.httpClient.post<AuthenticationDto>(`${this.apiUrl}/auth/register`, registerRequest);
  }

  private setUser(authenDto: AuthenticationDto) {
    localStorage.setItem('authen', JSON.stringify(authenDto));
    this.currentUserSource.next(authenDto.appUserDto);
  }
}
