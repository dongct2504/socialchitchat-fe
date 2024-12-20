import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupChatsRoutingModule } from './group-chats-routing.module';
import { GroupChatsComponent } from './pages/group-chats.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    GroupChatsComponent,
  ],
  imports: [
    CommonModule,
    GroupChatsRoutingModule,
    SharedModule
  ]
})
export class GroupChatsModule { }
