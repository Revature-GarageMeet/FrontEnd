import { NgModule } from '@angular/core';
import { flush } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { PostComponent } from './post/post.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {path: '', component: LoginComponent  },
  {path: 'login', component: LoginComponent},
  {path: 'post', component: PostComponent},
  {path: 'register', component: RegisterComponent},
<<<<<<< HEAD
  {path: 'homepage', component: HomepageComponent}
=======
  {path: 'userprofile', component: UserprofileComponent}
>>>>>>> 553e5ea637224c14b0716711a7fcce84e8266a67
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
