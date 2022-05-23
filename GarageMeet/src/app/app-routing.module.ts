import { NgModule } from '@angular/core';
import { flush } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { RegisterComponent } from './register/register.component';
>>>>>>> Tucker
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {path: '', component: LoginComponent  },
  {path: 'login', component: LoginComponent},
  {path: 'post', component: PostComponent},
<<<<<<< HEAD
=======
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component: LoginComponent  },
  {path: 'register', component: RegisterComponent}
>>>>>>> 90d07cd2a424f41f537d9bf356522a958c6f0d84
=======
  {path: 'homepage', component: HomepageComponent},
>>>>>>> Tucker
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
