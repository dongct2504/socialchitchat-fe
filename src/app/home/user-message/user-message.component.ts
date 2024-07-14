import { Component, Input, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/messages/messages.service';
import { MessageDto } from 'src/app/shared/models/messageDtos/messageDto';

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.css']
})
export class UserMessageComponent implements OnInit {
  @Input() userId?: string;

  messages?: MessageDto[];

  constructor(private messagesService: MessagesService) {
  }

  ngOnInit(): void {
    this.getMessageThread();
  }

  getMessageThread() {
    if (!this.userId) {
      return;
    }

    this.messagesService.getMessageThread(this.userId).subscribe(messages => {
      this.messages = messages;
    })
  }
}
