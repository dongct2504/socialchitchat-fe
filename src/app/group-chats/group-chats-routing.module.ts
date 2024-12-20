import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupChatsComponent } from './pages/group-chats.component';

const routes: Routes = [
  { path: '', component: GroupChatsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupChatsRoutingModule { }
