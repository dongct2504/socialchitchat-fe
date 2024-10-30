import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LikedComponent } from './pages/liked.component';

const routes: Routes = [
  { path: '', component: LikedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LikedRoutingModule { }
