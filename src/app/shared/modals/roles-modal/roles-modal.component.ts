import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppUsersWithRolesDto } from '../../models/appUserDtos/appUsersWithRolesDto';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent implements OnInit {
  @Input() updateSelectedRoles = new EventEmitter();
  user?: AppUsersWithRolesDto;
  roles: any[] = [];

  rolesForm = {} as FormGroup;

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  updateRoles() {
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }

  private initForm() {
    this.rolesForm = this.fb.group({
    })
  }
}
