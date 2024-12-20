import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupChatDto } from 'src/app/shared/models/messageDtos/groupChatDto';
import { MessageDto } from 'src/app/shared/models/messageDtos/messageDto';
import { PagedList } from 'src/app/shared/models/pagedList';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GroupChatsService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getChatListForUser(): Observable<GroupChatDto[]> {
    return this.httpClient.get<GroupChatDto[]>(`${this.apiUrl}/group-chats`);
  }

  public getGroupChat(id: string): Observable<PagedList<MessageDto>> {
    return this.httpClient.get<PagedList<MessageDto>>(`${this.apiUrl}/group-chats/${id}`);
  }
}
