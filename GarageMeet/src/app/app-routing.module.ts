import { NgModule } from '@angular/core';
import { flush } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {path: '', component: LoginComponent  },
  {path: 'login', component: LoginComponent},
  {path: 'post', component: PostComponent},
  {path: 'homepage', component: HomepageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
