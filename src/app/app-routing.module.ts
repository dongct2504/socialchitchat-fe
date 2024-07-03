import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotfoundComponent } from './core/errors/notfound/notfound.component';
import { InternalServerErrorComponent } from './core/errors/internal-server-error/internal-server-error.component';
import { TestErrorsComponent } from './core/errors/test-errors/test-errors.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'test-errors', component: TestErrorsComponent },
  { path: 'notfound', component: NotfoundComponent },
  { path: 'internal-server-error', component: InternalServerErrorComponent },
  {
    path: 'authen',
    loadChildren: () => import('./authen/authen.module').then(mod => mod.AuthenModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'search',
    canActivate: [AuthGuard],
    loadChildren: () => import('./search/search.module').then(mod => mod.SearchModule)
  },
  {
    path: 'liked',
    canActivate: [AuthGuard],
    loadChildren: () => import('./liked/liked.module').then(mod => mod.LikedModule)
  },
  {
    path: 'messages',
    canActivate: [AuthGuard],
    loadChildren: () => import('./messages/messages.module').then(mod => mod.MessagesModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./profile/profile.module').then(mod => mod.ProfileModule)
  },
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
