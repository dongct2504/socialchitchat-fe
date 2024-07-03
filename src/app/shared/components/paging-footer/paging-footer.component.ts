import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paging-footer',
  templateUrl: './paging-footer.component.html',
  styleUrls: ['./paging-footer.component.css']
})
export class PagingFooterComponent {
  @Input() itemPerPage = 0;
  @Input() totalRecords = 0;

  @Output() pageEventEmitter = new EventEmitter();

  onPageFooterChanged(event: any) {
    this.pageEventEmitter.emit(event);
  }
}
