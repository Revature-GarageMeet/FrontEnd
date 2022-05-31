import { NgModule } from '@angular/core';
import { flush } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { PostComponent } from './post/post.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ChatComponent } from './chat/chat.component';
import { resolve } from 'dns';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'post', component: PostComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'userprofile', component: UserprofileComponent },
  { path: 'chat', component: ChatComponent },
  // resolve:{
  //   singlePost: singlepost
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
