import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment.development';
import { AuthenticationDto } from '../shared/models/authenticationDtos/authenticationDto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  private hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);

  onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor() { }

  public createHubConnection(authenDto: AuthenticationDto) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.hubUrl}/presence`, {
        accessTokenFactory: () => authenDto.token
      })
      .withAutomaticReconnect()
      .build();
    
    this.hubConnection
      .start()
      .catch(err => console.log(err));

    // listening events
    this.hubConnection.on('UserIsOnline', id => {
      console.log(`user id: ${id} is online`);
    });

    this.hubConnection.on('UserIsOffline', id => {
      console.log(`user id: ${id} is offline`);
    });

    this.hubConnection.on('GetOnlineUsers', (userIds: string[]) => {
      this.onlineUsersSource.next(userIds);
    });
  }

  public stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection
        .stop()
        .catch(err => console.log(err));
    }
  }
}
