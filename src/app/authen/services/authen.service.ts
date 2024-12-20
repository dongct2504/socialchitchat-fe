import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AppUserDto } from 'src/app/shared/models/appUserDtos/appUserDto';
import { PresenceService } from 'src/app/presence/services/presence.service';
import { LoginAppUserDto } from 'src/app/shared/models/authenticationDtos/loginAppUserDto';
import { AuthenticationDto } from 'src/app/shared/models/authenticationDtos/authenticationDto';
import { RegisterAppUserDto } from 'src/app/shared/models/authenticationDtos/registerAppUserDto';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  private apiUrl = environment.apiUrl;

  private currentUserSource = new BehaviorSubject<AppUserDto | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient: HttpClient, private presenceService: PresenceService) {
  }

  public login(loginRequest: LoginAppUserDto): Observable<void> {
    return this.httpClient.post<AuthenticationDto>(`${this.apiUrl}/authen/login`, loginRequest).pipe(
      map(res => {
        if (res) {
          const authenDto = res as AuthenticationDto;
          this.setRole(authenDto);
          this.setAuthen(authenDto);
          this.presenceService.createHubConnection(authenDto.token);
        }
      })
    );
  }

  public register(registerRequest: RegisterAppUserDto): Observable<AuthenticationDto> {
    return this.httpClient.post<AuthenticationDto>(`${this.apiUrl}/authen/register`, registerRequest);
  }

  public loadCurrentUser(): AuthenticationDto | null {
    const authenJson = localStorage.getItem('socialchitchat-authen');
    if (authenJson) {
      const authen: AuthenticationDto = JSON.parse(authenJson);
      this.currentUserSource.next(authen.appUserDto);
      return authen;
    }
    return null;
  }

  public getToken(): string {
    const authenJson = localStorage.getItem('socialchitchat-authen');
    if (authenJson) {
      const authen: AuthenticationDto = JSON.parse(authenJson);
      return authen.token;
    }
    return '';
  }

  public isLoggedIn(): boolean {
    return this.currentUserSource.value !== null;
  }

  public logout() {
    localStorage.removeItem('socialchitchat-authen');
    this.currentUserSource.next(null);
    this.presenceService.stopHubConnection();
  }

  public setUser(userDto: AppUserDto) {
    const authenDto: AuthenticationDto = {
      appUserDto: userDto,
      token: this.getToken()
    };

    this.setRole(authenDto);
    this.setAuthen(authenDto);
  }

  private setRole(authenDto: AuthenticationDto) {
    authenDto.appUserDto.roles = [];

    const decodedToken = this.getDecodedToken(authenDto.token);
    const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    // if it has more than 1 roles then it's a array, if it's not then it's a string
    if (Array.isArray(roles)) {
      authenDto.appUserDto.roles = roles;
    } else {
      authenDto.appUserDto.roles.push(roles);
    }
  }

  private getDecodedToken(token: string) {
    // token has 3 part: header, payload, signature
    return JSON.parse(atob(token.split('.')[1])); // get the middle part (the payload)
  }

  private setAuthen(authenDto: AuthenticationDto) {
    localStorage.setItem('socialchitchat-authen', JSON.stringify(authenDto));
    this.currentUserSource.next(authenDto.appUserDto);
  }
}
