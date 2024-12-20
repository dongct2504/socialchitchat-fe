import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowComponent } from './pages/follow.component';

const routes: Routes = [
  { path: '', component: FollowComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FollowRoutingModule { }
