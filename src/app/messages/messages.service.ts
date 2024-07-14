import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { MessageDto } from '../shared/models/messageDtos/messageDto';
import { MessageParams } from '../shared/models/messageDtos/messageParams';
import { PagedList } from '../shared/models/pagedList';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getMessages(messageParams: MessageParams): Observable<PagedList<MessageDto>> {
    const params = this.initMessageParams(messageParams);
    return this.httpClient.get<PagedList<MessageDto>>(`${this.apiUrl}/messages`, { params });
  }

  public getMessageThread(id: string): Observable<MessageDto[]> {
    return this.httpClient.get<MessageDto[]>(`${this.apiUrl}/messages/thread/${id}`);
  }

  private initMessageParams(messageParams: MessageParams): HttpParams {
    let params = new HttpParams();

    params = params.append('contain', messageParams.contain);
    params = params.append('pageNumber', messageParams.pageNumber.toString());
    params = params.append('pageSize', messageParams.pageSize.toString());

    return params;
  }
}
