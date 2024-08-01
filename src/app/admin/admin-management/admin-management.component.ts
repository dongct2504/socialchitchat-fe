import { Component, OnInit } from '@angular/core';
import { AppUsersWithRolesDto } from 'src/app/shared/models/appUserDtos/appUsersWithRolesDto';
import { AdminService } from '../admin.service';
import { UsersWithRolesParams } from 'src/app/shared/models/adminDtos/usersWithRolesParams';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from 'src/app/shared/modals/roles-modal/roles-modal.component';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.css']
})
export class AdminManagementComponent implements OnInit {
  users?: AppUsersWithRolesDto[];
  bsModalRef?: BsModalRef;

  usersWithRolesParams = new UsersWithRolesParams();
  totalRecords = 0;

  constructor(private adminService: AdminService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  openRolesModal() {
    const initialState: ModalOptions = {
      initialState: {
        list: ['Open a modal with component', 'Pass your data', 'Do something else', '...'],
        title: 'Modal with component'
      }
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  private getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe(pagedList => {
      this.users = pagedList.items;
      this.totalRecords = pagedList.totalRecords;
      this.usersWithRolesParams.pageNumber = pagedList.pageNumber;
    });
  }
}
