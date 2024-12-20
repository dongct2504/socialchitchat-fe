import { Component, OnInit } from '@angular/core';
import { GroupChatDto } from 'src/app/shared/models/messageDtos/groupChatDto';
import { GroupChatsService } from '../services/group-chats.service';

@Component({
  selector: 'app-group-chats',
  templateUrl: './group-chats.component.html',
  styleUrls: ['./group-chats.component.css']
})
export class GroupChatsComponent implements OnInit {
  groupChats: GroupChatDto[] = [];
  isLoading = true;

  constructor(private groupChatService: GroupChatsService) {
  }

  ngOnInit(): void {
    this.fetchGroupChats();
  }

  fetchGroupChats(): void {
    this.isLoading = true;
    this.groupChatService.getChatListForUser().subscribe(chatList => {
      this.groupChats = chatList;
    });
  }
}
