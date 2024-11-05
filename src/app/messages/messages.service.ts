import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { MessageDto } from '../shared/models/messageDtos/messageDto';
import { MessageParams } from '../shared/models/messageDtos/messageParams';
import { PagedList } from '../shared/models/pagedList';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private apiUrl = environment.apiUrl;
  private hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;

  private messageThreadSource = new BehaviorSubject<MessageDto[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  public createHubConnection(token: string, otherUserId: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.hubUrl}/message?recipientId=${otherUserId}`, {
        accessTokenFactory: () => token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .catch(err => console.log(err));

    this.hubConnection.on('ReceiveMessageThread', (pagedList: PagedList<MessageDto>) => {
      this.messageThreadSource.next(pagedList.items);
    });

    this.hubConnection.on('NewMessage', (message: MessageDto) => {
      this.messageThread$.pipe(take(1)).subscribe(messages => {
        // do this without mutating the array (messageThread)
        this.messageThreadSource.next([...messages, message]);
      })
    });
  }

  public stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection
        .stop()
        .catch(err => console.log(err));
    }
  }

  public getMessages(messageParams: MessageParams): Observable<PagedList<MessageDto>> {
    const params = this.initMessageParams(messageParams);
    return this.httpClient.get<PagedList<MessageDto>>(`${this.apiUrl}/messages`, { params });
  }

  public getGroupMessagesBetweenTwoUsers(id: string): Observable<PagedList<MessageDto>> {
    return this.httpClient.get<PagedList<MessageDto>>(`${this.apiUrl}/group-chats/group-messages-between-two-users/${id}`);
  }

  public async sendMessageBetweenParticipants(recipientId: string, content: string): Promise<MessageDto> {
    // return this.httpClient.post<MessageDto>(`${this.apiUrl}/messages`, { recipientId, content });

    // return the Promise
    return this.hubConnection?.invoke('SendMessageAsync', { recipientId, content })
      .catch(err => console.log(err)); // no longer catch by ErrorInterceptor because it's not a Http Request
  }

  public deleteMessage(id: string) {
    return this.httpClient.delete(`${this.apiUrl}/messages/${id}`);
  }

  private initMessageParams(messageParams: MessageParams): HttpParams {
    let params = new HttpParams();

    params = params.append('contain', messageParams.contain);
    params = params.append('pageNumber', messageParams.pageNumber.toString());
    params = params.append('pageSize', messageParams.pageSize.toString());

    return params;
  }
}
