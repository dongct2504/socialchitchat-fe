import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'authen',
    loadChildren: () => import('./authen/authen.module').then(mod => mod.AuthenModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'liked',
    loadChildren: () => import('./liked/liked.module').then(mod => mod.LikedModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then(mod => mod.MessagesModule)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
