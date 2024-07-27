import { Component, OnInit } from '@angular/core';
import { MessageDto } from '../shared/models/messageDtos/messageDto';
import { MessageParams } from '../shared/models/messageDtos/messageParams';
import { PageSizeConstants } from '../shared/common/pageSizeConstants';
import { MessagesService } from './messages.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  isLoading = false; // to hide the profile picture glitch because it load slower

  constructor(
    private messageService: MessagesService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
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

  deleteMessage(id: string) {
    this.messageService.deleteMessage(id).subscribe(() => {
      this.toastr.info('Đã xóa tin nhắn thành công!');
      this.getMessages();
    });
  }

  private getMessages() {
    this.isLoading = true;
    this.messageService.getMessages(this.messageParams).subscribe(pagedList => {
      this.messages = pagedList.items;
      this.messageParams.pageNumber = pagedList.pageNumber;
      this.totalRecords = pagedList.totalRecords;
      this.isLoading = false;
    });
  }

  private initForm() {
    this.btnForm = this.fb.group({
      contain: [this.messageParams.contain]
    });
  }
}
