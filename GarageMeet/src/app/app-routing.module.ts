import { NgModule } from '@angular/core';
import { flush } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { GrouppageComponent } from './grouppage/grouppage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { CommentComponent } from './comment/comment.component';
import { PostComponent } from './post/post.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BandHomePageComponent } from './band-home-page/band-home-page.component';
import { resolve } from 'dns';
import { OtherProfileComponent } from './other-profile/other-profile.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'post', component: PostComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'userprofile', component: UserprofileComponent },
  { path: 'otherprofile/:userN', component: OtherProfileComponent },
  { path: 'comment', component: CommentComponent },
  { path: 'bandPage', component: BandHomePageComponent },
  { path: 'groupPage/:band', component: GrouppageComponent}
  // resolve:{
  //   singlePost: singlepost
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
