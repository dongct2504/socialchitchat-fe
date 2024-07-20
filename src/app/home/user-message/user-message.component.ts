import { Component, Input } from '@angular/core';
import { MessageDto } from 'src/app/shared/models/messageDtos/messageDto';

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.css']
})
export class UserMessageComponent {
  @Input() userId?: string;
  @Input() messages?: MessageDto[];
}
