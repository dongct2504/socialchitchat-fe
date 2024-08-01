import { Component, OnInit } from '@angular/core';
import { AppUsersWithRolesDto } from 'src/app/shared/models/appUserDtos/appUsersWithRolesDto';
import { AdminService } from '../admin.service';
import { UsersWithRolesParams } from 'src/app/shared/models/adminDtos/usersWithRolesParams';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from 'src/app/shared/modals/roles-modal/roles-modal.component';
import { RoleConstants } from 'src/app/shared/common/roleConstants';

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

  openRolesModal(user: AppUsersWithRolesDto) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user: user,
        roles: this.getCheckedRoles(user)
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe((values: any[]) => {
      const rolesToUpdate = {
        roles: [...values.filter(el => el.checked === true).map(el => el.value)]
      }
      if (rolesToUpdate) {
        this.adminService.updateUsersWithRoles(user.id, rolesToUpdate.roles).subscribe(returnRoles => {
          user.roles = returnRoles
        });
      }
    });
  }

  private getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe(pagedList => {
      this.users = pagedList.items;
      this.totalRecords = pagedList.totalRecords;
      this.usersWithRolesParams.pageNumber = pagedList.pageNumber;
    });
  }

  private getCheckedRoles(user: AppUsersWithRolesDto) {
    const roles: any[] = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      { name: 'Quản trị viên', value: RoleConstants.admin },
      { name: 'Nhân viên', value: RoleConstants.employee },
      { name: 'Người dùng', value: RoleConstants.user }
    ];

    availableRoles.forEach(role => {
      let isMatch = false;
      for (let userRole of userRoles) {
        if (role.value === userRole) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if (!isMatch) {
        role.checked = false;
        roles.push(role);
      }
    })

    return roles;
  }
}
