import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':username', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
