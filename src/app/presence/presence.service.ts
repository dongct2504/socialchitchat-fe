import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  private hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);

  onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor(private toastr: ToastrService) { }

  public createHubConnection(token: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.hubUrl}/presence`, {
        accessTokenFactory: () => token
      })
      .withAutomaticReconnect()
      .build();
    
    this.hubConnection
      .start()
      .catch(err => console.log(err));

    // listening events
    this.hubConnection.on('UserIsOnline', id => {
      this.onlineUsers$.pipe(take(1)).subscribe(ids => {
        this.onlineUsersSource.next([...ids, id]);
      })
    });

    this.hubConnection.on('UserIsOffline', id => {
      this.onlineUsers$.pipe(take(1)).subscribe(ids => {
        this.onlineUsersSource.next([...ids.filter(x => x !== id)]);
      })
    });

    this.hubConnection.on('GetOnlineUsers', (userIds: string[]) => {
      this.onlineUsersSource.next(userIds);
    });

    this.hubConnection.on('NewMessageReceived', ({ senderId, senderNickname }) => {
      this.toastr.info(`${senderNickname} đã gửi cho bạn tin nhắn!`);
    })
  }

  public stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection
        .stop()
        .catch(err => console.log(err));
    }
  }
}
