import { NgModule } from '@angular/core';
import { flush } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { GrouppageComponent } from './grouppage/grouppage.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CommentComponent } from './comment/comment.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '', component: GrouppageComponent },
  { path: '', component: HeaderComponent },
  { path: '', component: HomepageComponent },
  { path: 'comment', component: CommentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
