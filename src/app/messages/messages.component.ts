import { Component, OnInit } from '@angular/core';
import { MessageDto } from '../shared/models/messageDtos/messageDto';
import { MessageParams } from '../shared/models/messageDtos/messageParams';
import { PageSizeConstants } from '../shared/common/pageSizeConstants';
import { MessagesService } from './messages.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  btnForm?: FormGroup;

  messages?: MessageDto[];

  messageParams = new MessageParams();
  totalRecords = 0;

  constructor(private messageService: MessagesService, private fb: FormBuilder) {
    this.messageParams.pageSize = PageSizeConstants.pageSize12;
  }

  ngOnInit(): void {
    this.initForm();
    this.getMessages();
  }

  onChangeButton() {
    this.messageParams.contain = this.btnForm?.get('contain')?.value;
    this.getMessages();
  }
  
  onPageChanged(event: any) {
    // *bug
    this.messageParams.pageNumber = event.page;
    this.getMessages();
  }

  private getMessages() {
    this.messageService.getMessages(this.messageParams).subscribe(pagedList => {
      this.messages = pagedList.items;
      this.messageParams.pageNumber = pagedList.pageNumber;
      this.totalRecords = pagedList.totalRecords;
    });
  }

  private initForm() {
    this.btnForm = this.fb.group({
      contain: [this.messageParams.contain]
    });
  }
}
