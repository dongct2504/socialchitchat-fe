import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/messages/services/messages.service';
import { MessageDto } from 'src/app/shared/models/messageDtos/messageDto';

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.css']
})
export class UserMessageComponent implements OnInit {
  @Input() recipientId?: string;
  @Input() messages?: MessageDto[];

  messageForm = {} as FormGroup;

  constructor(public messagesService: MessagesService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  sendMessage() {
    if (this.recipientId) {
      this.messagesService.sendMessageBetweenParticipants(this.recipientId, this.messageForm.get('content')?.value).then(() => {
        this.messageForm.reset();
      });
    }
  }

  private initForm() {
    this.messageForm = this.fb.group({
      content: ['',
        [Validators.required]
      ]
    });
  }
}
